from Jumpscale import j
import gevent


def chat_method(func):
    def process_doc_str(prefix=None, func=None):
        S = None
        schema_in = None
        schema_out = None

        if func.__doc__:
            for line in func.__doc__.split("\n"):
                line = line.strip()
                if line.startswith("```in") or line.startswith("'''in"):
                    S = "in"
                    schema_text = ""
                elif line.startswith("```out") or line.startswith("'''out"):
                    S = "out"
                    schema_text = ""
                elif line.startswith("```") or line.startswith("'''"):
                    url = "%s.%s" % (prefix, S)
                    url = url.replace("..", ".").strip()
                    if S == "in":
                        schema_in = j.data.schema.get_from_text(schema_text, url=url)
                    else:
                        schema_out = j.data.schema.get_from_text(schema_text, url=url)
                    S = None
                elif S:
                    schema_text += line + "\n"

        return (schema_in, schema_out)

    @wraps(func)
    def wrapper_action(*args, **kwargs):
        self = args[0]
        if not len(args) == 1:
            raise j.exceptions.Input("actor methods only accept keyword arguments")
        self._log_debug(str(func))
        name = func.__name__
        self._log_debug(name)
        if "user_session" not in kwargs:
            # means not called through the gedis server
            assert "schema_out" not in kwargs

            prefix = "actors.%s.%s.%s" % (self.package.name, self._classname, name)
            # get the schemas
            if name not in self._schemas:
                self._schemas[name] = process_doc_str(prefix=prefix, func=func)
            schema_in, schema_out = self._schemas[name]

            if schema_in:
                if kwargs:
                    data = schema_in.new(datadict=kwargs)
                else:
                    data = schema_in.new()

                for pname in schema_in.propertynames:
                    kwargs[pname] = eval("data.%s" % pname)

            kwargs["user_session"] = j.application.admin_session
            kwargs["schema_out"] = schema_out

        res = func(self, **kwargs)
        return res

    return wrapper_action


class CHATBASE(j.baseclasses.object_config):
    """
    is an ssh client
    """

    _SCHEMATEXT = """
        @url = jumpscale.chat.multi.test
        name** = ""
        color = "red,green,blue" (E)
        timeout = 60 (I)
        """

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

    def _init(self, **kwargs):
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
            j.shell()
            self.meta = s.get(name=name_full)
        elif len(r) == 0:
            self.meta = s.new(name=name_full)
        else:
            raise j.exceptions.Input("found more than 1 metadata for chat")

        j.shell()

        self.meta.name = name_full
        self.meta.email = email
        self.meta.username = username
        self.meta.time = j.data.time.epoch
        self.meta.args = self.bot.kwargs

        j.shell()

    # @chat_method
    def step1_something(self):

        self.step(1)

    def _bcdb_selector(self):
        return j.data.bcdb.get_for_threebot("jumpscale.chat.test", "test", "redis")


def chat(bot):
    """
    to call http://localhost:5050/chat/session/food_multi
    """
    CHATBASE(bot=bot, chat="jumpscale.food_multi")

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
