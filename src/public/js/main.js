// Get User Profile

// Check Browser Storage API for Token
let token = localStorage.getItem("user_token");
if (!token) {
    token = "XXX";
}
// console.log("Token: " + token);
// $(".active").click(() => {
//     localStorage.setItem("user_token", "Somehting else");
// });
// $("a[href=\"#news\"]").click(() => {
//     localStorage.setItem("user_token", "");
// });

// Profile request
// $.get({
//     url: "/api/profile",
//     headers: {
//         "token": "XXX"
//     },
//     success: function(data, status, ctx) {
//         // A bunch of filling
//     },
//     error: function(ctx, status, error) {
//         // Same filling, but with login info
//     }
// })

// Feed Request
$.get({
    url: "/api/events",
    headers: {
        "token": "XXX"
    },
    dataType: "json",
    success: function(data, status, ctx) {
        console.log(data);
        let tmp = $("#newsfeed");
        for (let i in data.events) {
            // A bunch of filling
            tmp.append("<div>\
                <h2>" + data.events[i].title + "</h2>\
                <p>" + data.events[i].desc + "</p>\
            </div>");
        }
    },
    error: function(ctx, status, error) {
        // Same filling, but with login info
        console.log("Error: " + status + ": " + error);
        console.log(ctx);
    }
});