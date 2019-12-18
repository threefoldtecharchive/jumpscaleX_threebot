from Jumpscale import j


class vuejs(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):
        """
        specify the models you will need in the actor to get/save data into
        """
        self.vuejs_model = self.bcdb.model_get(url="jumpscale.examples_vuejs.test")

    @j.baseclasses.actor_method
    def ping(self, user_session=None):
        """
        example test actor method
        """
        return "pong"

    @j.baseclasses.actor_method
    def add_person(self, name, job, aboutme, user_session=None):
        """
        data should be defined in schema in
        ```in
        name = "" (S)
        job = "" (S)
        aboutme = "" (S)
        ```
        """
        model = self.vuejs_model.new()
        model.myname = name
        model.job = job
        model.aboutme = aboutme
        model.save()

    @j.baseclasses.actor_method
    def get_info(self, user_session=None):
        """
        example test method people data
        """
        persons = []
        for person in self.vuejs_model.find():
            if person.myname:
                persons.append(person._ddict_hr)
        return j.data.serializers.json.dumps(persons)
