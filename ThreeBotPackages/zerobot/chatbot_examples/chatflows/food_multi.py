from Jumpscale import j

from functools import wraps


def chat_method(func):
    @wraps(func)
    def wrapper_action(*args, **kwargs):
        self = args[0]
        if not len(args) == 1:
            raise j.exceptions.Input("methods only accept keyword arguments")
        self._log_debug(str(func))
        name = func.__name__
        self._log_debug(name)
        res = func(self, **kwargs)
        return res

    return wrapper_action


class CHATBASE(j.baseclasses.object_config):

    _SCHEMATEXT_META = """
        @url = jumpscale.chat.meta.1
        name** = ""
        args = (DICT)
        username** = ""
        email** = ""
        time = (T)
        steps = (LO) !jumpscale.chat.meta.step
        currentstep = (I)

        @url = jumpscale.chat.meta.step
        name = ""
        state = "new,progress,ok,error" (E)
        """

    def _init_actor(self, **kwargs):
        self.bot = kwargs["bot"]
        chat = kwargs["chat"]
        info = self.bot.user_info()
        email = info["email"]
        username = info["username"]
        if "name" in self.bot.kwargs:
            name = self.bot.kwargs["name"]
        else:
            name = "default"
        name_full = f"{chat}-{email}-{name}"

        self.name = name_full

        s = self._bcdb.model_get(schema=self._SCHEMATEXT_META)
        r = s.find(name=name_full)
        if len(r) == 1:
            self.meta = s.get(r[0].id)
        elif len(r) == 0:
            self.meta = s.new(name=name_full)
        else:
            raise j.exceptions.Input("found more than 1 metadata for chat")

        self.meta.name = name_full
        self.meta.email = email
        self.meta.username = username
        self.meta.time = j.data.time.epoch
        self.meta.args = self.bot.kwargs

        self.meta.save()

        self._data._autosave
        self._data.save()

    def _bcdb_selector(self):
        return j.data.bcdb.get_for_threebot("jumpscale.chat.test", "test", "redis")


class MyChat(CHATBASE):

    _SCHEMATEXT = """
        @url = jumpscale.chat.multi.test
        name** = ""
        color = "red,green,blue" (E)
        timeout = 60 (I)
        """

    def _init(self, **kwargs):
        self.step1_something()

    @chat_method
    def step1_something(self):
        j.shell()


def chat(bot):
    """
    to call http://localhost:5050/chat/session/food_multi
    """
    MyChat(bot=bot, chat="jumpscale.food_multi")

    # res = {}
    # waittime = bot.int_ask("Wait time")
    # for x in range(waittime):
    #     bot.loading_show("progress", (x // waittime) * 100)
    #     gevent.sleep(1)
    #
    # form = bot.new_form()
    # food = form.string_ask("What do you need to eat?")
    # amount = form.int_ask("Enter the amount you need to eat from %s in grams:" % food)
    # sides = form.multi_choice("Choose your side dishes: ", ["rice", "fries", "saute", "mashed potato"])
    # drink = form.single_choice("Choose your Drink: ", ["tea", "coffee", "lemon"])
    # form.ask()
    #
    # res = """
    # # You have ordered:
    # - {{amount.value}} grams, with sides {{sides.value}} and {{drink.value}} drink
    # ### Click next
    # for the final step which will redirect you to threefold.me
    # """
    # bot.template_render(res, **locals())
    # bot.redirect("https://threefold.me")
