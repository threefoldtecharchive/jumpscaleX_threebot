import json
from Jumpscale import j


def _validate_output_type(output_type):
    valid_types = ["csv", "json"]
    if output_type not in valid_types:
        raise j.exceptions.BadRequest("Invalid output type. Supported types are: {}".format(",".join(valid_types)))


def _format_output(data, output_type):
    if output_type == "json":
        return json.dumps(data)
    else:
        csv_data = ""
        if data:
            csv_data = ",".join(data[0].keys())
            for item in data:
                values = [str(value) for value in item.values()]
                csv_data += "\n" + ",".join(values)
        return csv_data


class taiga(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):
        self.taiga_client = j.clients.taiga.get("circles_admin")
        self._projects = {}
        self._milestones = {}
        self._priorities = {}
        self._assignees = {}
        self._issue_statuses = {}
        self._story_statuses = {}
        self._task_statuses = {}
        self._user_stories = {}

    def _get_project(self, project_id):
        if project_id not in self._projects:
            project = self.taiga_client.api.projects.get(project_id).name
            self._projects[project_id] = project
        return self._projects[project_id]

    def _get_milestone(self, milestone_id):
        if milestone_id:
            if milestone_id not in self._milestones:
                milestone = self.taiga_client.api.milestones.get(milestone_id).name
                self._milestones[milestone_id] = milestone
            return self._milestones[milestone_id]
        else:
            return "No milestone"

    def _get_priority(self, priority_id):
        if priority_id not in self._priorities:
            priority = self.taiga_client.api.priorities.get(priority_id).name
            self._priorities[priority_id] = priority
        return self._priorities[priority_id]

    def _get_assignee(self, assignee_id):
        if assignee_id:
            if assignee_id not in self._assignees:
                assignee = self.taiga_client.api.users.get(assignee_id).username
                self._assignees[assignee_id] = assignee
            return self._assignees[assignee_id]
        else:
            return "No assignee"

    def _get_issue_status(self, status_id):
        if status_id not in self._issue_statuses:
            status = self.taiga_client.api.issue_statuses.get(status_id).name
            self._issue_statuses[status_id] = status
        return self._issue_statuses[status_id]

    def _get_user_stories_status(self, status_id):
        if status_id not in self._story_statuses:
            status = self.taiga_client.api.user_story_statuses.get(status_id).name
            self._story_statuses[status_id] = status
        return self._story_statuses[status_id]

    def _get_task_status(self, status_id):
        if status_id not in self._task_statuses:
            status = self.taiga_client.api.task_statuses.get(status_id).name
            self._task_statuses[status_id] = status
        return self._task_statuses[status_id]

    @j.baseclasses.actor_method
    def get_user_circles(self, user_id, output_type="csv", user_session=None):
        """
        ```in
        user_id = (I)
        output_type = "csv" (S)
        ```
        """
        _validate_output_type(output_type)
        circles = self.taiga_client.api.projects.list(member=user_id)
        data = []
        for circle in circles:
            if circle.owner["id"] == user_id:
                data.append(
                    {
                        "ID": circle.id,
                        "Name": circle.name,
                        "Description": circle.description,
                        "Owner": circle.owner["username"],
                        "Slug": circle.slug,
                    }
                )
        return _format_output(data, output_type)

    @j.baseclasses.actor_method
    def get_circles_issues(self, project_id, output_type="csv", user_session=None):
        """
        ```in
        project_id = (I)
        output_type = "csv" (S)
        ```
        """
        _validate_output_type(output_type)
        try:
            circle = self.taiga_client.api.projects.get(project_id)
        except Exception:
            j.exceptions.BadRequest("Couldn't find project with id: {}".format(project_id))

        data = []
        for issue in circle.list_issues():
            project = self._get_project(issue.project)
            milestone = self._get_milestone(issue.milestone)
            priority = self._get_priority(issue.priority)
            assignee = self._get_assignee(issue.assigned_to)
            status = self._get_issue_status(issue.status)
            data.append(
                {
                    "ID": issue.id,
                    "Subject": issue.subject,
                    "Owner": issue.owner_extra_info["username"],
                    "Project": project,
                    "Milestone": milestone,
                    "Priority": priority,
                    "Assignee": assignee,
                    "Status": status,
                }
            )
        return _format_output(data, output_type)

    @j.baseclasses.actor_method
    def get_user_stories(self, user_id, output_type="csv", user_session=None):
        """
        ```in
        user_id = (I)
        output_type = "csv" (S)
        ```
        """
        _validate_output_type(output_type)
        user_stories = self.taiga_client.api.user_stories.list(assigned_to=user_id)
        data = []
        for user_story in user_stories:
            project = self._get_project(user_story.project)
            milestone = self._get_milestone(user_story.milestone)
            status = self._get_user_stories_status(user_story.status)
            data.append(
                {
                    "ID": user_story.id,
                    "Subject": user_story.subject,
                    "Project": project,
                    "Milestone": milestone,
                    "Status": status,
                    "Due date": user_story.due_date,
                }
            )
        return _format_output(data, output_type)

    @j.baseclasses.actor_method
    def get_user_tasks(self, user_id, output_type="csv", user_session=None):
        """
        ```in
        user_id = (I)
        output_type = "csv" (S)
        ```
        """

        _validate_output_type(output_type)
        user_tasks = self.taiga_client.api.tasks.list(assigned_to=user_id)
        data = []
        for user_task in user_tasks:
            project = self._get_project(user_task.project)
            milestone = self._get_milestone(user_task.milestone)
            status = self._get_task_status(user_task.status)
            data.append(
                {
                    "ID": user_task.id,
                    "Subject": user_task.subject,
                    "Project": project,
                    "User story": user_task.user_story,
                    "Milestone": milestone,
                    "Status": status,
                }
            )
        return _format_output(data, output_type)

