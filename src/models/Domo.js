var mongoose = require('mongoose');
var _ = require('underscore');

var DomoModel;

var setName = function(name) {
  return _.escape(name).trim();
};
var setPhrase = function(phrase) {
  return _.escape(phrase).trim();
};

var DomoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName
  },
  
  age: {
    type: Number,
    min: 0,
    required: true
  },
  
  catchphrase: {
    type: String,
    required: true,
    trim: true,
    set: setPhrase
  },
  
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account'
  },
  
  createdDate: {
    type: Date,
    default: Date.now
  }
});

DomoSchema.methods.toAPI = function() {
  return {
    name: this.name,
    age: this.age,
    catchphrase: this.catchphrase
  };
};

DomoSchema.statics.findByOwner = function(ownerID, callback) {
  var search = { owner: mongoose.Types.ObjectId(ownerID) };
  
  return DomoModel.find(search).select('name age catchphrase').exec(callback);
};

DomoModel = mongoose.model('Domo', DomoSchema);

module.exports.DomoModel = DomoModel;
module.exports.DomoSchema = DomoSchema;