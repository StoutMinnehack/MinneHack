

// Get User Profile

// Check Browser Storage API for Token

// Profile request
$.get({
  url: "/api/profile",
  headers: {
      "token": "XXX"
  },
  success: function(data, status, ctx) {

  },
  error: function(ctx, status, error) {

  }
})
