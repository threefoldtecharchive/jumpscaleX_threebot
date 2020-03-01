function callActor(package, actor, method, args, callback) {
    let threebotName, packageName;
    [threebotName, packageName] = package.split(".");
    packageGedisClient[threebotName][packageName].actors[actor][method](args).then(response => {
        response.text().then(data => {
            if (data) {
                callback(JSON.parse(data));
            } else {
                callback();
            }
        });
    });
}


function callActorAndRender(package, actor, method, args, containerId, isMarkdown) {
    callActor(package, actor, method, args, function (data) {
        let container = $(`#container_${containerId}`);
        let spinner = $(`#spinner_${containerId}`);
        let content = data.content;
        if (isMarkdown) {
            content = marked(content);
        }
        container.append(content);
        spinner.hide();
    });
}
