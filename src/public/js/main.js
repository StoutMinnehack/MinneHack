let token = "";

$(function () {
    $('#datetimepicker1').datetimepicker()
})

$(function () {
  $('[data-toggle="popover"]').popover()
})


function static_geo() {
    $.post({
        url: "/api/searchevents",
        headers: {
            token: token
        },
        data: JSON.stringify({
            area: {
                latitude: 4.9643487,
                longitude: -93.2272777,
                radius: 25
            }
        }),
        contentType: "application/json",
        dataType: "json",
        success: function(data, status, ctx) {
            console.log(data);
            let tmp = $("#newsfeed");
            for (let i in data) {
                // A bunch of filling
                tmp.append("<div>\
                    <h2>" + data[i].name + "</h2>\
                    <p>" + data[i].description + "</p>\
                </div>");
            }
        },
        error: function(ctx, status, error) {
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
            success: function(data, status, ctx) {
                console.log(data);
                let tmp = $("#newsfeed");
                for (let i in data) {
                    // A bunch of filling
                    tmp.append("<div>\
                        <h2>" + data[i].name + "</h2>\
                        <p>" + data[i].description + "</p>\
                    </div>");
                }
            },
            error: function(ctx, status, error) {
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

$("#create").click(() => {
    $("#new_event").removeClass("invisible");
});

$("#new_submit").click(() => {
    if (!$("#new_title").val() || !$("#new_desc").val()) {
        window.alert("Not a complete post");
        return;
    }
    $("#new_event").addClass("invisble");
    if (document.getElementById("new_images").files[0]) {
        var fileReader = new FileReader();
        fileReader.onloadend = function(e) {
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

function submit_post(picture) {
    $.post({
        url: "/api/addevent",
        headers: {
            "token": token
        },
        dataType: "json",
        data: JSON.stringify({
            name: $("#new_title").val(),
            description: $("#new_desc").val(),
            date: $("#new_date").val(),
            picture: picture,
            location: {
                latitude: 4.9643487,
                longitude: -93.2272777,
            }
        }),
        contentType: "application/json",
        success: function(data, status, ctx) {
            console.log(data);
        },
        error: function(ctx, status, error) {
            // Same filling, but with login info
            console.log("Error: " + status + ": " + error);
            console.log(ctx);
        }
    });
}
