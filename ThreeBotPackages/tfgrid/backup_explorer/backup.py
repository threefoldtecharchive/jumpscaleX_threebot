from Jumpscale import j

# get the sonic & zdb to run again
j.data.bcdb.threebot_start()

bcdbs = [i.name for i in j.data.bcdb.instances.values()]

# ['threebot_phonebook', 'tf_workloads', 'bcdbfs', 'myjobs', 'tf_grid_token', 'tfgrid_directory', 'threebot_phonebool', 'users', 'tf_directory']

if "system" not in bcdbs:
    bcdbs.append("system")
for exclude in ["bcdbfs", "myjobs"]:
    if exclude in bcdbs:
        bcdbs.pop(bcdbs.index(exclude))


dest = "/bcdb_export"
reset = True

bcdbs = ["tf_workloads"]

for bcdb_name in bcdbs:

    # TO TEST THE BCDB STORCLIENT
    s = j.data.bcdb._get_storclient(bcdb_name)
    # next will give you e.g. 40 records
    s.count
    # next will fail
    assert len([i for i in s.iterate()]) == s.count
    # j.shell()

    bcdb = j.data.bcdb.get(name=bcdb_name)

    bcdb.export(f"{dest}/{bcdb_name}", encrypt=False, reset=reset)
    # bcdb.import_(f"{dest}/{bcdb_name}", reset=False)
