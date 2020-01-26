let token = "";
var mymap = L.map('map').setView([44.505, -93.09], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidGhlMTB0aHdpeiIsImEiOiJjazV2NG51N3gwdHp4M21tYzF1cnBocjl6In0.dYNjqs7k6UQTfgvDJw9TgA', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    accessToken: 'pk.eyJ1IjoidGhlMTB0aHdpeiIsImEiOiJjazV2NG51N3gwdHp4M21tYzF1cnBocjl6In0.dYNjqs7k6UQTfgvDJw9TgA'
}).addTo(mymap);
var center = L.marker([44.505, -93.09], { draggable: true }); //.addTo(mymap);

var points = [];

$(function () {
    $('#datetimepicker1').datetimepicker()
})

mymap.on('click', onMapClick)

var latlng = null

let currentMarker = null
function onMapClick(e) {
    if (!currentMarker) {
        currentMarker = L.marker(e.latlng).addTo(mymap)
        currentMarker.bindPopup("Current create event position")
    } else {
        currentMarker.setLatLng(e.latlng)
    }
    latlng = e.latlng
}


function static_geo() {
    $.post({
        url: "/api/searchevents",
        headers: {
            token: token
        },
        data: JSON.stringify({
            area: {
                latitude: 44.9643487,
                longitude: -93.2272777,
                radius: 10000000
            }
        }),
        contentType: "application/json",
        dataType: "json",
        success: function (data, status, ctx) {
            console.log(data);
            for (let i in data) {
                // A bunch of filling
                var marker = L.marker([data[i].location.latitude, data[i].location.longitude]).addTo(mymap);
                marker.bindPopup("<div>\
                <h2>" + data[i].name + "</h2>\
                <p>" + data[i].description + "</p>\
                <p>" + data[i].date + "</p>\
            </div>");
                points.push(marker);
                console.log([data[i].location.latitude, data[i].location.longitude]);
            }
        },
        error: function (ctx, status, error) {
            // Same filling, but with login info
            console.log("Error: " + status + ": " + error);
            console.log(ctx);
        }
    });
}

// Feed Request
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((loc) => {
        console.log("Something");
        console.log({
            area: {
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude,
                radius: 25
            }
        });
        $.post({
            url: "/api/searchevents",
            headers: {
                token: token
            },
            data: JSON.stringify({
                area: {
                    latitude: loc.coords.latitude,
                    longitude: loc.coords.longitude,
                    radius: 25
                }
            }),
            contentType: "application/json",
            dataType: "json",
            success: function (data, status, ctx) {
                console.log(data);
                let tmp = $("#newsfeed");
                for (let i in data) {
                    // A bunch of filling
                    tmp.append("<div class=\"card\"><div class=\"card-body\"><h2>" +
                        data[i].name + "</h2><p>" +
                        data[i].description +
                        "</p></div></div>");
                }
            },
            error: function (ctx, status, error) {
                // Same filling, but with login info
                console.log("Error: " + status + ": " + error);
                console.log(ctx);
            }
        });
    }, (error) => {
        console.log(error);
    });
    static_geo();
} else {
    console.log("Location is disabled");
}

$('#new_event_cancel').click(() => {
    $("#new_event").addClass("invisible");
});

$("#create").click(() => {
    $("#new_event").removeClass("invisible");
});

$("#new_submit").click((e) => {
    e.preventDefault()
    if (!$("#new_title").val() || !$("#new_desc").val()) {
        window.alert("Not a complete post");
        return;
    }
    $("#new_event").addClass("invisible");
    if (document.getElementById("new_images").files[0]) {
        var fileReader = new FileReader();
        fileReader.onloadend = function (e) {
            if (!e.target.error) {
                submit_post(e.target.result);
            } else {
                window.alert("Error");
            }
        }
        fileReader.readAsDataURL(document.getElementById("new_images").files[0]);
    } else {
        submit_post("");
    }
});

let slider = document.getElementById("rangeSlider")
let output = document.getElementById("rangeText")

output.innerHTML = `Range: ${slider.value}km&nbsp;&nbsp;`

slider.oninput = function () {
    output.innerHTML = `Range: ${slider.value}km&nbsp;&nbsp;`
}

function submit_post(picture) {
    let date = $('#new_date').data().date
    $.post({
        url: "/api/addevent",
        headers: {
            "token": token
        },
        dataType: "json",
        data: JSON.stringify({
            name: $("#new_title").val(),
            description: $("#new_desc").val(),
            date: date,
            location: {
                latitude: latlng.lat,
                longitude: latlng.lng
            },
            picture: picture,
        }),
        contentType: "application/json",
        success: function (data, status, ctx) {
            console.log(data);
        },
        error: function (ctx, status, error) {
            // Same filling, but with login info
            console.log("Error: " + status + ": " + error);
            console.log(ctx);
        }
    });
}

var circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}); //.addTo(mymap);