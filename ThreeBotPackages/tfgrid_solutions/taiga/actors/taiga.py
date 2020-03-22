import json
import dateutil.parser
from functools import lru_cache
from Jumpscale import j


def _validate_output_type(output_type):
    valid_types = ["csv", "json"]
    if output_type not in valid_types:
        raise j.exceptions.Input("Invalid output type. Supported types are: {}".format(",".join(valid_types)))


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

    @lru_cache(maxsize=128)
    def _get_project(self, project_id):
        return self.taiga_client.api.projects.get(project_id).name

    @lru_cache(maxsize=128)
    def _get_milestone(self, milestone_id):
        if milestone_id:
            return self.taiga_client.api.milestones.get(milestone_id).name
        else:
            return "No milestone"

    @lru_cache(maxsize=128)
    def _get_priority(self, priority_id):
        return self.taiga_client.api.priorities.get(priority_id).name

    @lru_cache(maxsize=128)
    def _get_assignee(self, assignee_id):
        if assignee_id:
            return self.taiga_client.api.users.get(assignee_id).username
        else:
            return "No assignee"

    @lru_cache(maxsize=128)
    def _get_issue_status(self, status_id):
        return self.taiga_client.api.issue_statuses.get(status_id).name

    @lru_cache(maxsize=128)
    def _get_user_stories_status(self, status_id):
        return self.taiga_client.api.user_story_statuses.get(status_id).name

    @lru_cache(maxsize=128)
    def _get_task_status(self, status_id):
        return self.taiga_client.api.task_statuses.get(status_id).name

    @lru_cache(maxsize=128)
    def _get_user_id(self, username):
        user = self.taiga_client.api.users.list(username=username)
        if user:
            user = user[0]
            return user.id
        else:
            raise j.exceptions.Input("Couldn't find user with username: {}".format(username))

    @j.baseclasses.actor_method
    def get_user_circles(self, username, output_type="csv", schema_out=None, user_session=None):
        """
        ```in
        username = (S)
        output_type = "csv" (S)
        ```
        """
        _validate_output_type(output_type)
        user_id = self._get_user_id(username)
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
    def get_circles_issues(self, project_id, output_type="csv", schema_out=None, user_session=None):
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
            raise j.exceptions.RemoteException("Couldn't find project with id: {}".format(project_id))

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
    def get_user_stories(self, username, output_type="csv", schema_out=None, user_session=None):
        """
        ```in
        username = (S)
        output_type = "csv" (S)
        ```
        """
        _validate_output_type(output_type)
        user_id = self._get_user_id(username)
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
    def get_user_tasks(self, username, output_type="csv", schema_out=None, user_session=None):
        """
        ```in
        username = (S)
        output_type = "csv" (S)
        ```
        """
        _validate_output_type(output_type)
        user_id = self._get_user_id(username)
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

    @j.baseclasses.actor_method
    def move_story_to_cirlce(self, story_id, project_id, schema_out=None, user_session=None):
        """
        ```in
        story_id = (I)
        project_id = (I)
        ```
        """

        def _get_project_status(project_statuses, status):
            for project_status in project_statuses:
                if project_status.name == status:
                    return project_status.id

        try:
            user_story = self.taiga_client.api.user_stories.get(story_id)
        except Exception:
            raise j.exceptions.RemoteException("Couldn't find user story with id: {}".format(story_id))

        project_stories_statuses = self.taiga_client.api.user_story_statuses.list(project=project_id)
        status = self._get_user_stories_status(user_story.status)
        story_status_id = _get_project_status(project_stories_statuses, status)

        try:
            migrate_story = self.taiga_client.api.user_stories.create(
                project=project_id,
                subject=user_story.subject,
                assigned_to=user_story.assigned_to,
                milestone=user_story.milestone,
                status=story_status_id,
                tags=user_story.tags,
            )
        except Exception:
            raise j.exceptions.RemoteException("No project with id: {} found".format(project_id))
        try:
            comments = self.taiga_client.api.history.user_story.get(story_id)
            comments = sorted(comments, key=lambda c: dateutil.parser.isoparse(c["created_at"]))

            for comment in comments:
                migrate_story.add_comment(comment["comment_html"])

            project_tasks_statuses = self.taiga_client.api.task_statuses.list(project=project_id)
            for task in user_story.list_tasks():
                status = self._get_task_status(task.status)
                task_status_id = _get_project_status(project_tasks_statuses, status)
                migrate_task = migrate_story.add_task(
                    subject=task.subject,
                    status=task_status_id,
                    due_date=task.due_date,
                    milestone=task.milestone,
                    assigned_to=task.assigned_to,
                    tags=task.tags,
                    project=migrate_story.project,
                    user_story=migrate_story.id,
                )
                comments = self.taiga_client.api.history.task.get(migrate_task.id)
                comments = sorted(comments, key=lambda c: dateutil.parser.isoparse(c["created_at"]))

                for comment in comments:
                    migrate_task.add_comment(comment["comment_html"])

        except Exception as e:
            self.taiga_client.api.user_stories.delete(migrate_story.id)
            raise j.exceptions.RuntimeError("Failed to migrate story error was: {}".format(str(e)))

        self.taiga_client.api.user_stories.delete(story_id)
        return migrate_story.id
