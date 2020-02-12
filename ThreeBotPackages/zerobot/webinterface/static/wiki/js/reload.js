function reloadWiki(name) {
    const spinner = $(`#spinner_${name.replace('.', '_')}`);
    spinner.show()

    callActor("zerobot.webinterface", "wiki_content", "reload", {
        wiki_name: name
    }, function () {
        spinner.hide();
    });
}
