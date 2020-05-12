var sessionId = null
var currentWork = {}
var chatBotClient = packageGedisClient.zerobot.webinterface.actors.chatbot

var stringGenerator = function (field, id) {
    let defaultValue =  field.default || "" 
    let content = `
        <div class="form-group">
            <h4>${field.msg}</h4>
            <input type="text" id="${id}" class="form-control" value="${defaultValue}">
        </div>
    `
    return content
}

var secretGenerator = function (field, id) {
    let defaultValue =  field.default || "" 
    let content = `
        <div class="form-group">
            <h4>${field.msg}</h4>
            <input type="password" id="${id}" class="form-control" value="${defaultValue}">
        </div>
    `
    return content
}

var textContentGenerator = function (field, id) {
    let defaultValue =  field.default || "" 
    let content = `
        <div class="form-group">
            <h4>${field.msg}</h4>
            <textarea rows="4" cols="50" id="${id}" class="form-control">${defaultValue}</textarea>
        </div>
    `
    return content
}

var intGenerator = function (field, id) {
    let defaultValue =  field.default || ""
    let content = `
        <div class="form-group">
            <h4>${field.msg}</h4>
            <input type="number" id="${id}" class="form-control" value="${defaultValue}">
        </div>
    `
    return content
}

var mdContentGenerate = function (field) {
    let converter = new showdown.Converter({
        tables: true,
        backslashEscapesHTMLTags: true,
        tablesHeaderId: "table"
    });
    const htmlContents = converter.makeHtml(field.msg);
    return htmlContents;
}

var singleChoiceGenerate = function (field, id) {
    let defaultValue =  field.default || ""
    let choices = "";
    const classes = ["primary", "success", "danger", "warning", "info"];
    
    $.each(field.options, function (i, value) {
        if (i >= classes.length) { i -= classes.length;}
        let checked = value == defaultValue ? "checked" : ""
        choices += `
        <div class="funkyradio-${classes[i]}">
            <input type="radio" name="${id}" id="${value}" value="${value}" ${checked}/>
            <label for="${value}">${value}</label>
        </div>`;
    });

    let contents = `
        <h4>${field.msg}</h4>
        <div class="funkyradio">${choices}</div>`;
    return contents;
}

var multiChoiceGenerate = function (field, id) {
    let defaultValue =  field.default || []
    let choices = ""
    $.each(field.options, function (i, value) {
        let checked = defaultValue.includes(value) ? "checked" : ""
        let active = checked ? "active" : ""
        choices += `
        <div class="items col-xs-5 col-sm-5 col-md-3 col-lg-3">
            <div class="info-block block-info clearfix">
                <div data-toggle="buttons" class="btn-group bizmoduleselect">
                    <label class="btn btn-default ${active}">
                        <div class="bizcontent">
                            <input type="checkbox" name="${id}" autocomplete="off" value="${value}" ${checked}>
                            <span class="glyphicon glyphicon-ok glyphicon-lg"></span>
                            <h5>${value}</h5>
                        </div>
                    </label>
                </div>
            </div>
        </div>`;
    });
    let contents = `
    <h4>${field.msg}</h4>
    <div class="form-group">
        <div class="checkbox-container">
            <div class="row">${choices}</div>
        </div>
    </div>`;
    return contents;
}

var multiListChoice = function (field, id) {
    var options_list = []
    var default_option = field.default || field.options[0]

    field.options.forEach(element => {
        const tempOpt = { label: element, value: element };
        options_list.push(JSON.stringify(tempOpt));
    });

    let content = `
        <div class="select-wrapper">
            <h4>${field.msg}</h4>
            <span id="multiListChoice" class="autocomplete-select"></span>
        </div>
        <script>
            var customIcon = document.createElement('img');
            customIcon.src = '/staticchat/chat/img/remove.svg';
            var autocomplete = new SelectPure(".autocomplete-select", {
                options: [${options_list}],
                value: [],
                multiple: true,
                autocomplete: true,
                icon: "fa fa-times",
                onChange: value => {},
                classNames: {
                select: "select-pure__select",
                dropdownShown: "select-pure__select--opened",
                multiselect: "select-pure__select--multiple",
                label: "select-pure__label",
                placeholder: "select-pure__placeholder",
                dropdown: "select-pure__options",
                option: "select-pure__option",
                autocompleteInput: "select-pure__autocomplete",
                selectedLabel: "select-pure__selected-label",
                selectedOption: "select-pure__option--selected",
                placeholderHidden: "select-pure__placeholder--hidden",
                optionHidden: "select-pure__option--hidden",
                }
            });
        </script>
    `
    return content
}

var locationContentGenerate = function (field, id) {
    return `
    <h4>${field.msg}</h4>
    <div class="form-group">
        <input type="text" placeholder="Location" class="form-control" id="${id}" readonly>
        <div id="mymap" class="mapdiv" style="width: 60%; height: 300px;">
        <script>
            function locationChoiceGenerate() {
                let lat = 51.260197;
                let lng = 4.402771;

                let mymap = L.map('mymap').setView([lat, lng], 4);

                L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
                    maxZoom: 18,
                    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                    id: 'mapbox.streets'
                }).addTo(mymap);

                let popup = L.popup();

                function onMapClick(e) {
                    popup
                        .setLatLng(e.latlng)
                        .setContent("You clicked the map at " + e.latlng.toString())
                        .openOn(mymap);
                    sLat = e.latlng['lat'];
                    sLng = e.latlng['lng'];
                    $("#value").val(sLat.toString() + "," + sLng.toString());
                }
                mymap.on('click', onMapClick);
                $('#mymap').on('shown.bs.modal', function () {
                    setTimeout(function () {
                        mymap.invalidateSize();
                    }, 1);
                });
            }
            locationChoiceGenerate();
        </script>
        </div>
    </div>
    <label class="location-error">${field.label}</label>
    `
}

var dropDownChoiceGenerate = function (field, id) {
    defaultValue = field.default || ""

    let choices = "";
    $.each(field.options, function (i, value) {
        let selected = defaultValue == value ? "selected" : ""
        choices += `<option value="${value}" ${selected}>${value}</option>`;
    });

    let contents = null;
    if (field.auto_complete) {
        contents = `
        <h4>${field.msg}</h4>
        <div>
            <input class="form-control" id="${id}" value="${defaultValue}" type="search" list="choices" placeholder="Please select an option">
            <datalist id="choices">
                ${choices}
            </datalist>
        </div>`;

    } else {
        contents = `
        <h4>${field.msg}</h4>
        <div class="form-group">
            <select class="form-control" id="${id}" value="${defaultValue}">
                ${choices}
            </select>
        </div>`;
    }
    return contents;
}

var dateTimePickerAsk = function (field, id) {
    let defaultValue = field.default ? new Date(field.default * 1000) : "";
    let contents = `
    <h4>${field.msg}</h4>
    <div class="row">
        <div class='col-sm-6'>
            <div class="form-group">
                <div class='input-group date' id="${id}">
                    <input type='text' class="form-control" />
                    <span class="input-group-addon">
                        <span class="glyphicon glyphicon-calendar"></span>
                    </span>
                </div>
            </div>
    </div>
    <script type="text/javascript">
        $(function () {
            var dateNow = new Date();
            dateNow.setHours(dateNow.getHours()+2)
            $('#datetimepicker1').datetimepicker({
                defaultDate:dateNow
            });
        });
    </script>
    `
    return contents;
}

var captchaContentGenerate = function (field, id) {
    return `
    <h4>${field.msg}</h4><br>
    <img src="data:image/png;base64,${field.captcha}"/><br><br>
    <div class="form-group">
        <input type="text" placeholder="Captcha" class="form-control" id="${id}">
    </div>
    <label class="captcha-error">${field.label}</label>`
}

var generateDownloadAsFile = function (field, id) {
    let msg = field.msg;
    msg = msg.replace(/\n/g, "<br />");
    let msg_with_trim = '`' + msg.trim() + '`';
    return `
    <h4>${msg}</h4>
    <div class="form-group">
        <button class="btndownload" style="width:100%" onclick="event.preventDefault();download(${msg_with_trim},'${field.filename}')">
            <i class="fa fa-download"></i> Download
        </button>
    </div>`
}

var generateUploadFile = function (field, id) {
    return `
    <h4>${field.msg}</h4>
    <div class="form-group" onclick="upload()">
        <input id="upload" type="file"/><br>
        <pre data-upload-id="${id}" id="${id}"></pre>
    </div>`
}

function redirect (url) {
    $(location).attr("href", url);
}

function download(text, filename) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function upload() {
    document.getElementById('upload').addEventListener('change', handleUploadFileSelect, false);
}

function handleUploadFileSelect(event) {
    const reader = new FileReader()
    reader.onload = handleUploadFileLoad;
    reader.readAsText(event.target.files[0])
}

function handleUploadFileLoad(event) {
    let uploadId = document.querySelectorAll('[data-upload-id]')[0].id;
    document.getElementById(uploadId).textContent = event.target.result;
}

function generateField(work, fieldName) {
    switch (work.category) {
        case "string_ask":
            return stringGenerator(work, fieldName);
        case "secret_ask":
            return secretGenerator(work, fieldName);
        case "text_ask":
            return textContentGenerator(work, fieldName);
        case "int_ask":
            return intGenerator(work, fieldName);
        case "md_show":
        case "md_show_update":
            return mdContentGenerate(work, fieldName);
        case "single_choice":
            return singleChoiceGenerate(work, fieldName);
        case "multi_choice":
            return multiChoiceGenerate(work, fieldName);
        case "multi_list_choice":
            return multiListChoice(work, fieldName);
        case "drop_down_choice":
            return dropDownChoiceGenerate(work, fieldName);
        case "captcha_ask":
            return captchaContentGenerate(work, fieldName);
        case "download_file":
            return generateDownloadAsFile(work, fieldName);
        case "upload_file":
            return generateUploadFile(work, fieldName);
        case "datetime_picker":
            return dateTimePickerAsk(work, fieldName)
    }
}

var workHandler = function (work) {

    if (work.error) {
        $("#error").html(work.error);
        $("#next-button").attr("disabled", false);
        $(".form-box").hide({"duration": 400});
        return
    }

    if ((work.step == 1 || work.previous == false) && work.question <= 1) {
        $("#previous-button").attr("disabled", true);
    } else {
        $("#previous-button").attr("disabled", false);
    }

    if (work.category == "redirect") { 
        // redirect to external url
        redirect();
    
    } else if (work.category  == "md_show_update") {
        $("#next-button").html("<i class='fa fa-spinner fa-spin '></i>");
        $("#next-button").attr("disabled", "disabled");
        return workReport(null);

    } else if (work.category == "user_info") {
        // send user info
        var result = JSON.stringify({username: USERNAME, email: EMAIL })
        workReport(result);

    } else if (work.category == "end_of_step") {    
        if (work.step < work.steps) {
            // go to next step
            next_step()
        } else {
            // end of workflow, hide action buttons
            $("#next-button").hide();
            $("#previous-button").hide();
        }
    } else if (work) { 
        // handle work
        var contents = ""
        currentWork.category = work.category
        currentWork.fields = Array.isArray(work.msg) ? work.msg : [work]
        currentWork.fields.forEach((field, index) => {
            contents += generateField(field, `value-${index}`)
        })

        $("#spinner").hide();
        $("#form").html(contents);
        $(".form-box").show({duration: 400});
        $("#step-title").html(work.title || "");

        if (work.step) {
            $("#step-range").html(`${work.step} / ${work.steps}`);
        }
    }
}


function newSession() {
    chatBotClient.session_new({topic: TOPIC, query_params: QS}).then(response => {
        return response.json().then((json) => {
            sessionId = json.sessionid
            getWork()
        })
    })
}


function getWork() {
    chatBotClient.work_get({sessionid: sessionId}).then(response => {
        response.json().then(work => {
            if (work.category == "end_of_chat") {
                $("#step-title").html("Done")
                $("#step-range").hide()
                return;
            }
            workHandler(work)
            getWork()
        })
    })
}

function workReport(result) {
    $("#spinner").show();
    let data = {sessionid: sessionId, result: result}
    chatBotClient.work_report(data).then(response => {
        $("#previous-button").text("Back");
    })
}

function next_step() {
    let data = {sessionid: sessionId}
    chatBotClient.next_step(data).then(response => {
        $("#previous-button").text("Previous Step");
    })
}

function prev_step() {
    let data = {sessionid: sessionId}
    chatBotClient.prev_step(data).then(response => {
        $("#previous-button").text("Previous Step");
    })
}


$("#next-button").on("click", (event) => {
    event.preventDefault();
    var values = []
    currentWork.fields.forEach((field, index) => {
        let value = null
        if (["string_ask", "int_ask", "text_ask", "secret_ask", "download_file", "drop_down_choice", "captcha_ask", "location_ask"].includes(field.category)) {
            value = $(`#value-${index}`).val();
        } else if (field.category === "upload_file") {
            value = $(`#value-${index}`)[0].textContent;
        } else if (field.category === "single_choice") {
            value = $(`input[name='value-${index}']:checked`).val();
        } else if (field.category === "multi_choice") {
            mvalue = [];
            $(`input[name='value-${index}']:checked`).each(function () {
                mvalue.push($(this).val());
            });
            value = JSON.stringify(mvalue)
        } else if (field.category === "multi_list_choice") {
            let mvalues = document.getElementById("multiListChoice").innerText.split("\n");
            value = JSON.stringify(mvalues);
        } else if (field.category === "datetime_picker") {
            value = new Date($(`#value-${index}`).datetimepicker().data().date).valueOf() / 1000
        }

        const errors = validate(value, field.kwargs.validate);
        if (errors.length > 0) {
            var ul = $('<ul>');
            $(errors).each(function (index, error) {
                ul.append($('<li>').html(error));
            });
            $("#error").html(ul);
            $("#error").removeClass("hidden");
            return
        }
        values.push(value);
    })
    console.log(values)
    if (currentWork.category == "form") {
        workReport(JSON.stringify(values))
    } else {
        workReport(values[0])
    }
})


$("#previous-button").on("click", () => {
    prev_step()
})

newSession()
