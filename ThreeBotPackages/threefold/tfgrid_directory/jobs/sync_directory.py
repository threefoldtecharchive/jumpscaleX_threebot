from datetime import datetime
from Jumpscale import j

timeformat = "%a, %d %b %Y %H:%M:%S %Z"

def sync_directory():
    bcdb = j.data.bcdb.get("tf_directory")
    farm_model = bcdb.model_get(url="tfgrid.farm.1")
    node_model = bcdb.model_get(url="tfgrid.node.2")

    response = j.clients.threefold_directory.client.ListFarmers()[1]
    farms = response.json()

    for farm in farms:
        farmobjs = farm_model.find(name=farm["name"])
        if not farmobjs:
            farm_object = farm_model.new(farm).save()
        else:
            farm_object = farmobjs[0]

        nodes = j.clients.threefold_directory.client.ListCapacity(query_params={"farmer": farm["iyo_organization"]})[1].json()
        for node in nodes:
            if node_model.find(node_id=node["node_id"]):
                continue

            if "used_resources" in node:
                node["used_resource"] = node["used_resources"]
            if "reserved_resources" in node:
                node["reserved_resource"] = node["reserved_resources"]
            if "total_resources":
                node["total_resource"] = node["total_resources"]
            node["farmer_id"] = farm_object.id

            if "updated" in node:
                updated = datetime.strptime(node["updated"], timeformat)
                node["updated"] = updated.strftime("%d/%m/%Y %H:%M")
            if "created" in node:
                created = datetime.strptime(node["created"], timeformat)
                node["created"] = created.strftime("%d/%m/%Y %H:%M")
            node_model.new(node).save()
