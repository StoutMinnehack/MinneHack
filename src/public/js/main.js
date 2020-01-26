// Get User Profile

// Check Browser Storage API for Token

// Profile request
$.get({
    url: "/api/profile",
    headers: {
        "token": "XXX"
    },
    success: function(data, status, ctx) {
        // A bunch of filling
    },
    error: function(ctx, status, error) {
        // Same filling, but with login info
    }
})

// Feed Request
$.get({
    url: "/api/events",
    headers: {
        "token": "XXX"
    },
    success: function(data, status, ctx) {
        // A bunch of filling
    },
    error: function(ctx, status, error) {
        // Same filling, but with login info
    }
})