from Jumpscale import j

# get the sonic & zdb to run again
j.data.bcdb.start_servers_threebot_zdb_sonic()

bcdbs = {i.name: j.data.bcdb.get(name=i.name) for i in j.data.bcdb.instances}

if "system" not in bcdbs:
    bcdbs["system"] = j.data.bcdb.system
for exclude in ["bcdbfs", "myjobs"]:
    if exclude in bcdbs:
        bcdbs.pop(exclude)

dest = "/bcdb_export"
reset = True


for bcdb_name, bcdb in bcdbs.items():

    # TO TEST THE BCDB STORCLIENT
    s = bcdb.storclient
    # next will give you e.g. 40 records
    s.count
    # next will fail
    assert len([i for i in s.iterate()]) == s.count

    bcdb.export(f"{dest}/{bcdb_name}", encrypt=False, reset=reset)
