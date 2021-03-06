import mongoose from 'mongoose'

class MongoConnector {
  Schema = mongoose.Schema;

  public Account: mongoose.Model<any> | null = null;
  public Event: mongoose.Model<any> | null = null;

  public Test: mongoose.Model<any> | null = null;


  constructor() {
    var accountSchema = new mongoose.Schema({
      token: String,
      name: String,
      picture: String,
      events: [String]
    });
    var eventSchema = new mongoose.Schema({
      creator_id: String,
      name: String,
      description: String,
      date: String,
      picture: String,
      location: {
        city: String,
        state: String,
        zip: String,
        latitude: Number,
        longitude: Number
      },
      participants: [String]
    });

    mongoose.connect('mongodb+srv://minneadm:minneadm@stoutminnehack-5puv3.gcp.mongodb.net/minnehack', { useNewUrlParser: true }).then((value) => {
      this.Account = value.model('Account', accountSchema);
      this.Event = value.model('Event', eventSchema);
    })

  }

}

export default new MongoConnector()
