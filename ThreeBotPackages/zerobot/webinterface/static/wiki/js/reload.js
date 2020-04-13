
function reloadAction(name, action) {
    const spinner = $(`#spinner_${name.replace('.', '_')}`);
    spinner.show()

    callActor("zerobot.webinterface", "mdbook", action, {
        package_name: name
    }, function () {
        spinner.hide();
    });
}


function reloadWiki(name) {
    return reloadAction(name, "reload");
}

// function pullWiki(name) {
//     return reloadAction(name, "pull")
// }
