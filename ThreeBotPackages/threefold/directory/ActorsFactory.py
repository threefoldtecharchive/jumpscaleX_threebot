from Jumpscale import j

class ActorsFactory(j.baseclasses.factory):

    __jslocation__ = "j.cockpit.actors"


    def test(self, name=""):
        """
        Run cockpit actors test
        """
        print(name)
        self._test_run(name=name)

        self._log_info("All TESTS DONE")
        return "OK"
