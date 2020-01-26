let token = "";

function static_geo() {
    $.post({
        url: "/api/searchevents",
        headers: {
            "token": token
        },
        data: {
            area: {
                latitude: 4.9643487,
                longitude: -93.2272777,
                radius: 25
            }
        },
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
                "token": token
            },
            data: {
                area: {
                    latitude: loc.coords.latitude,
                    longitude: loc.coords.longitude,
                    radius: 25
                }
            },
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
    $("#new_event").removeClass("hidden");
});

$("#new_submit").click(() => {
    if (!$("#new_title").text() || !$("#new_desc").text()) {
        window.alert("Not a complete post");
        return;
    }
    $("#new_event").addClass("hidden");

    var fileReader = new FileReader();
    fileReader.onloadend = function(e) {
        if (!e.target.error) {
            $.post({
                url: "/api/addevent",
                headers: {
                    "token": token
                },
                dataType: "json",
                data: {
                    name: $("#new_title").text(),
                    description: $("#new_desc").text(),
                    images: e.target.result,
                },
                success: function(data, status, ctx) {
                    console.log(data);

                },
                error: function(ctx, status, error) {
                    // Same filling, but with login info
                    console.log("Error: " + status + ": " + error);
                    console.log(ctx);
                }
            });
        } else {
            window.alert("Error");
        }
    }
    fileReader.readAsDataURL(document.getElementById("new_images").files[0]);
});