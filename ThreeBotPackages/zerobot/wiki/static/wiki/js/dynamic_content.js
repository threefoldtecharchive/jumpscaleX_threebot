function callActorAndRender(actor, method, args, containerId) {
    localGedisClient.actors[actor][method](args).then(response => {
        response.json().then(data => {
            let container = $(`#container_${containerId}`);
            let spinner = $(`#spinner_${containerId}`);
            container.append(data.content);
            spinner.hide();
        });
    });
}
