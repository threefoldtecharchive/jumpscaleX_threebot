
function reloadAction(name, action) {
    const spinner = $(`#spinner_${name.replace('.', '_')}`);
    spinner.show()

    callActor("zerobot.webinterface", "wiki_content", action, {
        wiki_name: name
    }, function () {
        spinner.hide();
    });
}


function reloadWiki(name) {
    return reloadAction(name, "reload");
}

function pullWiki(name) {
    return reloadAction(name, "pull")
}
