from itertools import chain

# from JumpscaleCoreLib.BaseClassesLib import BaseClassesLib

# b=BaseClassesLib()
# idea is to see if we can get our basic basesclasses to work
# will do some fancy work for seeing changes and sending it back to server over websocket

# class SolarSystem(b.object):


class SolarSystem(object):
    planets = [
        list(chain(planet, (index + 1,)))
        for index, planet in enumerate(
            (
                ("Mercury", "hot", 2240),
                ("Venus", "sulphurous", 6052),
                ("Earth", "fertile", 6378),
                ("Mars", "reddish", 3397),
                ("Jupiter", "stormy", 71492),
                ("Saturn", "ringed", 60268),
                ("Uranus", "cold", 25559),
                ("Neptune", "very cold", 24766),
            )
        )
    ]

    lines = ("{} is a {} planet", "The radius of {} is {} km", "{} is planet nr. {} counting from the sun")

    def __init__(self):
        self.lineIndex = 0

    def greet(self):
        self.planet = self.planets[int(Math.random() * len(self.planets))]
        document.getElementById("greet").innerHTML = "Hello {}".format(self.planet[0])
        self.explain()

    def explain(self):
        document.getElementById("explain").innerHTML = self.lines[self.lineIndex].format(
            self.planet[0], self.planet[self.lineIndex + 1]
        )
        self.lineIndex = (self.lineIndex + 1) % 3


solarSystem = SolarSystem()


class Person:
    def __init__(self, name, number):
        self.ws = __new__(WebSocket(self.ws_url))
        self.ws.onopen = self.onopen
        self.ws.onmessage = self.onmessage
        self.ws.onclose = self.onclose
        self.ws.onerror = self.onerror

        self._name = name
        self._number = number

    @property
    def ws_url(self):
        return (
            window.location.protocol.replace("http", "ws") + "//" + window.location.host + "/svelte_example/websocket"
        )

    def get_number(self):
        return self._number

    def set_number(self, value):
        self._number = value
        self.ws.send(f"set:{self.json()}")

    def get_name(self):
        return self._name

    def set_name(self, value):
        self._name = value
        self.ws.send(f"set:{self.json()}")

    name = property(get_name, set_name)
    number = property(get_number, set_number)

    def json(self):
        return JSON.stringify({"name": self.name, "number": self.number})

    def onopen(self, e):
        console.log("opened")

    def onmessage(self, e):
        console.log(e.data)

    def onclose(self, e):
        console.log(e)

    def onerror(self, e):
        console.log(e)


class Company:
    def success(self, data):
        console.log(data)

    def fail(self, err):
        console.log(err)

    def add_company(self, data, callback):
        console.log("data passed", data)
        return axios.post("/jumpscale/svelte/model/jumpscale.svelte.company.1", data)

    def delete_company(self, id):
        jq.ajax(
            {
                "url": "/jumoscale/svelte/model/threebot.examples.person.1/" + id,
                "type": "DELETE",
                "dataType": "json",
                "contentType": "application/json",
                "success": self.success,
                "fail": self.fail,
            }
        )

    def list_companies(self, name=None):
        if name is None:
            jq.ajax(
                {
                    "url": "/jumpscale/svelte/model/threebot.examples.person.1",
                    "type": "GET",
                    "dataType": "json",
                    "contentType": "application/json",
                    "success": self.success,
                    "fail": self.fail,
                }
            )
        else:
            jq.ajax(
                {
                    "url": "/threebot/svelte/model/threebot.examples.person.1?name=" + name,
                    "type": "GET",
                    "dataType": "json",
                    "contentType": "application/json",
                    "success": self.success,
                    "fail": self.fail,
                }
            )

    def update_company(self, data):
        jq.ajax(
            {
                "url": "/threebot/svelte/model/threebot.examples.person.1/" + id,
                "type": "POST",
                "data": JSON.stringify(data),
                "dataType": "json",
                "contentType": "application/json",
                "success": self.success,
                "fail": self.fail,
            }
        )

    def delete_company(self, id):
        jq.ajax(
            {
                "url": "/threebot/svelte/model/threebot.examples.person.1/" + id,
                "type": "DELETE",
                "dataType": "json",
                "contentType": "application/json",
                "success": self.success,
                "fail": self.fail,
            }
        )
