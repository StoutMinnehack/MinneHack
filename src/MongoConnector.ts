class MongoConnector {
    var mongoose = require('mongoose');
    var Schema = mogoose.Schema;

    var Login: Model;
    var Account: Model;
    var Event:  Model;

    constructor() {
      var loginSchema = new mongoose.Schema({
        _id: String,
        user_id: String,
        token: String
      });
      var accountSchema = new mongoose.Schema({
        _id: String,
        token: String,
        name: String,
        picture: String,
        events: String[]
      });
      var eventSchema = new mongoose.Schema({
        _id: String,
        creator_id: String,
        name: String,
        description: String,
        picture: String,
        location: {
          city: String,
          state: String,
          zip: String,
          latitude: Number,
          logitude: Number
        },
        paricipants: [String]
      });

      this.Login = mongoose.model('Login', loginSchema);
      this.Account = mongoose.model('Account', accountSchema);
      this.Event = mogoose.model('Event', eventModel);
    }

}
