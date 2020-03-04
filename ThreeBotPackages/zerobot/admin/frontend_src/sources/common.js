import AnsiUp from "ansi_up";

export const json_ajax = webix.ajax().headers({ "Content-type": "application/json" });

export const ansiUp = new AnsiUp();

export const dateFormat = "%Y-%m-%d %G:%i:%s";

export const webixDateFormatter = webix.Date.dateToStr(dateFormat);

export const dateFormatter = function (value) {
    // format epoch timestamps
    if (value instanceof String) {
        value = parseInt(value);
    }

    return webixDateFormatter(new Date(value * 1000));
}
