from Jumpscale import j


dest = "/bcdb_export"
reset = True

j.shell()

for bcdb_name in bcdbs:
    bcdb = j.data.bcdb.get(name=bcdb_name)
    bcdb.import_(f"{dest}/{bcdb_name}", reset=False)

j.shell()


# download()
