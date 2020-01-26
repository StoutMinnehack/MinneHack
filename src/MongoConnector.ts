import mongoose from 'mongoose'

interface LoginSchema extends mongoose.SchemaDefinition {
  _id: mongoose.Types.ObjectId,
  user_id: mongoose.Types.ObjectId,
  token: String
}

interface AccountSchema extends mongoose.SchemaDefinition {
  _id: mongoose.Types.ObjectId,
  token: String,
  name: String,
  picture: String,
  events: [String]
}

interface EventSchema extends mongoose.SchemaDefinition {
      _id: mongoose.Types.ObjectId,
      creator_id: mongoose.Types.ObjectId,
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
}
class MongoConnector {
  Schema = mongoose.Schema;

  public Login: mongoose.Model<any>;
  public Account: mongoose.Model<any>;
  public Event: mongoose.Model<any>;

  constructor() {
    var loginSchema = new mongoose.Schema(<LoginSchema>{});
    var accountSchema = new mongoose.Schema(<AccountSchema>{});
    var eventSchema = new mongoose.Schema(<EventSchema>{});

    mongoose.connect('mongodb+srv://minneadm:minneadm@stoutminnehack-5puv3.gcp.mongodb.net/minnehack', { useNewUrlParser: true })

    this.Login = mongoose.model('Login', loginSchema);
    this.Account = mongoose.model('Account', accountSchema);
    this.Event = mongoose.model('Event', eventSchema);
  }

}

export default new MongoConnector()
