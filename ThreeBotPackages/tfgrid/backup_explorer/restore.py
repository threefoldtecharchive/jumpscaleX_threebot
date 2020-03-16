from Jumpscale import j


dest = "/bcdb_export"
reset = True

namespaces = {
    "tfgrid_directory": "tfgrid",
    "tf_workloads": "tfgrid",
    "tf_grid_token": "tfgrid",
    "threebot_phonebook": "tfgrid",
    "tf_directory": "tfgrid",
    "users": "zerobot",
}
sonic, zdb = j.data.bcdb.start_servers_threebot_zdb_sonic()
adminsecret_ = j.data.hash.md5_string(zdb.adminsecret_)
zdb_admin = zdb.client_admin_get()


for path in j.sal.fs.listDirsInDir(dest):
    bcdb_name = j.sal.fs.getBaseName(path)
    if bcdb_name == "system":
        bcdb = j.data.bcdb.system
    else:
        namespace = namespaces[bcdb_name]
        if not zdb_admin.namespace_exists(namespace):
            zdb_admin.namespace_new(namespace, secret=adminsecret_, maxsize=0, die=True)

        storclient = zdb.client_get(namespace, adminsecret_)
        bcdb = j.data.bcdb.get(name="threebot_%s_%s" % ("zdb", namespace), storclient=storclient)

    bcdb.import_(path)
