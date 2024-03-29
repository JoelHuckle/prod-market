const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },

  //required if no username and pasword
  google: {
    type: String,
    required: function () {
      return !this.userName && !this.password; // Make googleId required if userName and password are not provided
    },
  },

  //required if no google id
  userName: {
    type: String,
    required: function () {
      return !this.google;
    },
  },
  password: {
    type: String,
    required: function () {
      return !this.google;
    },
  },

  banner: {
    type: String,
  },
  caption: {
    type: String,
  },
  instagram: {
    type: String,
  },
  following: {
    type: Array,
    default: [],
  },
  pendingServices: {
    type: Array,
    default: [],
  },
  subscribedTo: {
    type: Array,
    default: [],
  },
  purchasedLoops: {
    type: Array,
    default: [],
  },
  purchasedServices: {
    type: Array,
    default: [],
  },
  lastPosted: {
    type: Date,
  },
});

module.exports = mongoose.model("User", UserSchema);
