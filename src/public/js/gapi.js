function onSignIn(googleUser) {
    console.log("Worked");
    // Useful data for your client-side scripts:
    // var profile = googleUser.getBasicProfile();
    // console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    // console.log('Full Name: ' + profile.getName());
    // console.log('Given Name: ' + profile.getGivenName());
    // console.log('Family Name: ' + profile.getFamilyName());
    // console.log("Image URL: " + profile.getImageUrl());
    // console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    token = googleUser.getAuthResponse().id_token;
    // console.log("ID Token: " + token);
    $.post({
        url: "/api/login",
        headers: {
            "token": token
        },
        data: {
            "token": token,
            "name": profile.getName(),
            "picture": profile.getImageUrl()
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
    })
}

function onFail(error) {
    console.log(error);
}