var sessionId = null
var newStep = true
var chatBotClient = packageGedisClient.zerobot.webinterface.actors.chatbot


var stringGenerator = function (work, field = "") {
    let name = field || "value"
    let value =  work.kwargs.default || "" 
    let content = `
        <div class="form-group">
            <h4>${work.msg}</h4>
            <input type="text" name="${name}" class="form-control" value="${value}">
        </div>
    `
    return content
}


var secretGenerator = function (work, field = "") {
    let name = field || "value"
    let value =  work.kwargs.default || "" 
    let content = `
        <div class="form-group">
            <h4>${work.msg}</h4>
            <input type="password" name="${name}" class="form-control" value="${value}">
        </div>
    `
    return content
}


var textContentGenerator = function (work, field = "") {
    let name = field || "value"
    let value =  work.kwargs.default || "" 
    let content = `
        <div class="form-group">
            <h4>${work.msg}</h4>
            <textarea rows="4" cols="50" name="${name}" class="form-control">${value}</textarea>
        </div>
    `
    return content
}


var intGenerator = function (work, field = "") {
    let name = field || "value"
    let value =  work.kwargs.default || "" 
    let content = `
        <div class="form-group">
            <h4>${work.msg}</h4>
            <input type="number" name="${name}" class="form-control" value="${value}">
        </div>
    `
    return content
}


var mdContentGenerate = function (message) {
    let converter = new showdown.Converter({
        tables: true,
        tablesHeaderId: "table"
    });
    const htmlContents = converter.makeHtml(message.msg);
    return htmlContents;
}






var captchaContentGenerate = function (message, captcha, label, kwargs, idx) {
    return `
    <h4>${message}</h4>
    <img src="data:image/png;base64,${captcha}"/>
    <div class="form-group">
        <input type="text" placeholder="Captcha" class="form-control" id="value_${idx}">
    </div>
    <label class="captcha-error">${label}</label>`
}

var locationContentGenerate = function (message, label, kwargs) {
    return `
    <h4>${message}</h4>
    <div class="form-group">
        <input type="text" placeholder="Location" class="form-control" id="value" readonly>
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
    <label class="location-error">${label}</label>




    `
}

var multiChoiceGenerate = function (message, options, kwargs, idx) {
    let choices = ""
    $.each(options, function (i, value) {
        choices += `
        <div class="items col-xs-5 col-sm-5 col-md-3 col-lg-3">
            <div class="info-block block-info clearfix">
                <div data-toggle="buttons" class="btn-group bizmoduleselect">
                    <label class="btn btn-default">
                        <div class="bizcontent">
                            <input type="checkbox" name="value_${idx}" autocomplete="off" value="${value}">
                            <span class="glyphicon glyphicon-ok glyphicon-lg"></span>
                            <h5>${value}</h5>
                        </div>
                    </label>
                </div>
            </div>
        </div>`;
    });
    let contents = `
    <h4>${message}</h4>
    <div class="form-group">
        <div class="checkbox-container">${choices}</div>
    </div>`;
    return contents;
}

var singleChoiceGenerate = function (message, options, kwargs, idx) {
    let choices = "";
    const classes = ["primary", "success", "danger", "warning", "info"];
    $.each(options, function (i, value) {
        if (i >= classes.length) {
            i -= classes.length;
        }
        choices += `
        <div class="funkyradio-${classes[i]}">
            <input type="radio" name="value_${idx}" id="${value}" value="${value}"/>
            <label for="${value}">${value}</label>
        </div>`;
    });
    let contents = `
    <h4>${message}</h4>
    <div class="funkyradio">${choices}</div>`;
    return contents;
}

var multiListChoice = function (message, options, kwargs, idx) {
    var options_list = []
    var default_option = options[0]

    options.forEach(element => {
        const tempOpt = { label: element, value: element };
        options_list.push(JSON.stringify(tempOpt));
    });

    let content = `
    <div class="select-wrapper">
        <h4>${message}</h4>
        <span id="multiListChoice" class="autocomplete-select"></span>
    </div>
    <script>
        var customIcon = document.createElement('img');
        customIcon.src = '/staticchat/chat/img/remove.svg';
        var autocomplete = new SelectPure(".autocomplete-select", {
            options: [${options_list}],
            value: ["${default_option}"],
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

var dropDownChoiceGenerate = function (message, options, kwargs, idx) {
    let choices = "";
    $.each(options, function (i, value) {
        choices += `<option value="${value}">${value}</option>`;
    });
    let contents = null;
    // in case we need autocomplete in dropdown
    if (kwargs.auto_complete) {

        contents = `
        <h4>${message}</h4>
        <div>
            <input class="form-control" id="value_${idx}" type="search" list="choices" placeholder="Please select an option">
            <datalist id="choices">
                ${choices}
            </datalist>
        </div>`;

    } else {
        contents = `
        <h4>${message}</h4>
        <div class="form-group">
            <select class="form-control" id="value_${idx}">
                ${choices}
            </select>
        </div>`;
    }
    return contents;
}

var dateTimePickerAsk = function (message, kwargs, idx) {
    let contents = `
    <h4>${message}</h4>
    <p>Default: 2 hours<p>
    <div class="row">
        <div class='col-sm-6'>
            <div class="form-group">
                <div class='input-group date' id='datetimepicker1'>
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

var generateDownloadAsFile = function (message, filename) {
    let msg = message;
    msg = msg.replace(/\n/g, "<br />");
    let msg_with_trim = '`' + message.trim() + '`';
    return `
    <h4>${msg}</h4>
    <div class="form-group">
        <button class="btndownload" style="width:100%" onclick="event.preventDefault();download(${msg_with_trim},'${filename}')"><i class="fa fa-download"></i> Download</button>
    </div>`
}

var generateUploadFile = function (message, kwargs, idx) {
    let msg = message;
    msg = msg.replace(/\n/g, "<br />");
    let msg_with_trim = '`' + message.trim() + '`';
    return `
    <h4>${msg}</h4>
    <div class="form-group" onclick="upload()">
            <input id="upload" type="file" name="file"/>
            <pre data-upload-id="${idx}" id="value_${idx}"></pre>
    </div>`
}




var generateSlide = function (message) {
    // if error: leave the old slide and show the error
    if (message["error"]) {
        // $("#error").html(message['error']);
        // $(".btn-submit").attr("disabled", "false");
        $(".form-box").hide({
            "duration": 400
        });
        return
    }
    // If the response contains redirect, so this was the final slide and will take new action
    else if (message['cat'] === "redirect") {
        $(location).attr("href", message["msg"]);
        return
    }

    // let contents = "";
    // let messages = [];
    // let res = null;
    // if (message['cat'] == "form") {
    //     messages = message['msg'];
    // } else {
    //     messages = [message];
    // }
    let contents = ""

    switch (message.cat) {
        case "string_ask":
            contents += stringGenerator(message);
            break;
        case "secret_ask":
            contents += secretGenerator(message);
            break;
        case "text_ask":
            contents += textContentGenerator(message);
            break;
        case "int_ask":
            contents += intGenerator(message);
            break;
        case "md_show":
        case "md_show_update":
            contents += mdContentGenerate(message);
            break;
    }

    

    // for (var i = 0; i < messages.length; i++) {
    //     res = messages[i];
    //     switch (res['cat']) {
    //         case "string_ask":
    //             contents += stringContentGenerate(res['msg'], res['kwargs'], i);
    //             break;
    //         case "secret_ask":
    //             contents += secretContentGenerate(res['msg'], res['kwargs'], i);
    //             break;
    //         case "download_file":
    //             contents += generateDownloadAsFile(res['msg'], res['filename'], res['kwargs'], i);
    //             break;
    //         case "upload_file":
    //             contents += generateUploadFile(res['msg'], res['kwargs'], i);
    //             break;
    //         case "text_ask":
    //             contents += textContentGenerate(res['msg'], res['kwargs'], i);
    //             break;
    //         case "int_ask":
    //             contents += intContentGenerate(res['msg'], res['kwargs'], i);
    //             break;
    //         case "captcha_ask":
    //             contents += captchaContentGenerate(res['msg'], res['captcha'], res['label'], res['kwargs']);
    //             break;
    //         case "md_show":
    //             contents += mdContentGenerate(res['msg'], res['kwargs']);
    //             break;
    //         case "md_show_update":
    //             contents += mdContentGenerate(res['msg'], res['kwargs']);
    //             break;
    //         case "multi_choice":
    //             contents += multiChoiceGenerate(res['msg'], res['options'], res['kwargs'], i)
    //             break;
    //         case "single_choice":
    //             contents += singleChoiceGenerate(res['msg'], res['options'], res['kwargs'], i)
    //             break;
    //         case "drop_down_choice":
    //             contents += dropDownChoiceGenerate(res['msg'], res['options'], res['kwargs'], i)
    //             break;
    //         case "location_ask":
    //             contents += locationContentGenerate(res['msg'], res['options'], res['kwargs'])
    //             break;
    //         case "multi_list_choice":
    //             contents += multiListChoice(res['msg'], res['options'], res['kwargs'], i);
    //             break;
    //     }
    // }


    // if (res['cat'] === "user_info") {
    //     next(JSON.stringify({ "username": USERNAME, "email": EMAIL }), true);
    // }
    

    $("#spinner").hide();
    $("#form").html(contents);
    $(".form-box").show({duration: 400});
  
  
  
    // if (message['cat'] == "md_show_update") {
    //     // $(".btn-submit").html("<i class='fa fa-spinner fa-spin '></i>");
    //     // $(".btn-submit").attr("disabled", "disabled");
    //     return next(null);
    // }

    // $(".btn-submit").on("click", function (ev) {
    //     ev.preventDefault();
    //     let values = [];
    //     value = "";
    //     for (var idx = 0; idx < messages.length; idx++) {
    //         res = messages[idx];
    //         if (["string_ask", "int_ask", "text_ask", "secret_ask", "download_file", "drop_down_choice", "captcha_ask", "location_ask"].includes(res['cat'])) {
    //             value = $(`#value_${idx}`).val();
    //         } else if (res['cat'] === "upload_file") {
    //             value = $(`#value_${idx}`)[0].textContent;
    //         } else if (res['cat'] === "single_choice") {
    //             value = $(`input[name='value_${idx}']:checked`).val();
    //         } else if (res['cat'] === "multi_choice") {
    //             let mvalues = [];
    //             $(`input[name='value_${idx}']:checked`).each(function () {
    //                 mvalues.push($(this).val());
    //             });
    //             value = JSON.stringify(mvalues);
    //         } else if (res['cat'] === "multi_list_choice") {
    //             let mvalues = document.getElementById("multiListChoice").innerText.split("\n");
    //             value = JSON.stringify(mvalues);
    //         }
    //         // Validate the input
    //         const errors = validate(value, res['kwargs']['validate']);
    //         if (errors.length > 0) {
    //             var ul = $('<ul>');
    //             $(errors).each(function (index, error) {
    //                 ul.append($('<li>').html(error));
    //             });
    //             $("#error").html(ul);
    //             $("#error").removeClass("hidden");
    //             return
    //         }
    //         values.push(value);
    //     }
    //     if (message["cat"] == "form") {
    //         workReport(JSON.stringify(values));
    //     } else {
    //         workReport(values[0]);
    //     }
    // });
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
        response.json().then(json => {
            
            toggleNextButton(json.next)
            togglePreviousButton(json.previous)

            if (json.cat == "next") { 
                next_step()
            }
            else { 
                generateSlide(json) 
            }
            getWork()
        })
    })
}

function workReport(result) {
    let data = {sessionid: sessionId, result: result}
    chatBotClient.work_report(data).then(response => {
        newStep = false
    })
}


function next_step() {
    let data = {sessionid: sessionId}
    chatBotClient.next_step(data).then(response => {
        newStep = true
    })
}


function prev_step() {
    let data = {sessionid: sessionId, newstep: newStep}
    chatBotClient.prev_step(data).then(response => {
        newStep = true
    })
}


function toggleNextButton(show) {
    // $("#next-button").attr("disabled", !show);
}


function togglePreviousButton(show) {
    // $("#previous-button").attr("disabled", !show);
}


function getFormData() {
    data = {}
    var formData = $('#form').serializeArray();
    formData.forEach((item) => {
        data[item["name"]] = item["value"]
    })
    return data
}


$("#next-button").on("click", () => {
    let result = getFormData()
    workReport(result["value"])
})


$("#previous-button").on("click", () => {
    prev_step()
})


newSession()


















// function work_get_results(session_id_resp) {
//     packageGedisClient.zerobot.webinterface.actors.chatbot.work_get({ "sessionid": session_id_resp['sessionid'] }).then(resp => {
//         return resp.json().then(function (parsedJson) {
//             my_vars.sessionid = session_id_resp.sessionid
//             generateSlide(parsedJson);
//         });
//     })
// }


// let seach_res = packageGedisClient.zerobot.webinterface.actors.chatbot.session_new({ "topic": TOPIC, "query_params": QS }).then(resp => {
//     return resp.json().then(function (resp) {
//         work_get_results(resp)
//         return resp;
//     });

// })

// // load main chat
// function work_get_results(session_id_resp) {
//     packageGedisClient.zerobot.webinterface.actors.chatbot.work_get({ "sessionid": session_id_resp['sessionid'] }).then(resp => {
//         return resp.json().then(function (parsedJson) {
//             my_vars.sessionid = session_id_resp.sessionid
//             generateSlide(parsedJson);
//         });
//     })
// }






// function previous() {
//     chatBotClient.prev_step({sessionid: session_id_resp['sessionid'] }).then(resp => {})
// }
