function onSignIn(googleUser) {
    console.log("Worked");
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
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
            token: token
        },
        data: JSON.stringify({
            token: token,
            name: profile.getName(),
            picture: profile.getImageUrl()
        }),
        contentType: "application/json",
        success: function(data, status, ctx) {
            console.log(status);
            console.log("Logged in");
        },
        error: function(ctx, status, error) {
            // Same filling, but with login info
            console.log("Error: " + status + ": " + error);
            console.log(ctx);
        }
    })
    $(".g-signin2").addClass("invisible");
    $(".login").removeClass("invisible");
    $(".profile").attr("src", profile.getImageUrl());
}

function onFail(error) {
    console.log(error);
    $(".g-signin2").removeClass("invisible");
    $(".login").addClass("invisible");
}

$("#logout").click(function() {
    gapi.auth2.getAuthInstance().signOut();
    $(".g-signin2").removeClass("invisible");
    $(".login").addClass("invisible");
});