

def sync_directory():
    from datetime import datetime

    old_format = "%a, %d %b %Y %H:%M:%S %Z"
    new_format = "%d/%m/%Y %H:%M"

    bcdb = j.data.bcdb.get("tf_directory")
    farm_model = bcdb.model_get(url="tfgrid.farm.1")
    node_model = bcdb.model_get(url="tfgrid.node.2")

    response = j.clients.threefold_directory.client.ListFarmers()[1]
    response.raise_for_status()
    farms = response.json()

    for farm in farms:
        farmobjs = farm_model.find(name=farm["name"])
        if not farmobjs:
            farm_object = farm_model.new(farm).save()
        else:
            farm_object = farmobjs[0]

        response = j.clients.threefold_directory.client.ListCapacity(query_params={"farmer": farm["iyo_organization"]})[1]
        response.raise_for_status()
        nodes = response.json()

        for node in nodes:
            node["farm_id"] = farm_object.id

            if "used_resources" in node:
                node["used_resource"] = node["used_resources"]
            if "reserved_resources" in node:
                node["reserved_resource"] = node["reserved_resources"]
            if "total_resources":
                node["total_resource"] = node["total_resources"]

            if "updated" in node:
                updated = datetime.strptime(node["updated"], old_format)
                node["updated"] = updated.strftime(new_format)
            if "created" in node:
                created = datetime.strptime(node["created"], old_format)
                node["created"] = created.strftime(new_format)


            existing_nodes = node_model.find(node_id=node["node_id"])
            if existing_nodes:
                node_object = existing_nodes[0]
                node_model.set_dynamic(node, node_object.id)
            else:
                node_object = node_model.new(node)
                node_object.save()
