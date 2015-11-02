var _ = require('underscore');
var models = require('../models');

var Domo = models.Domo;

var makerPage = function(req, res) {
  Domo.DomoModel.findByOwner(req.session.account._id, function(err, docs) {
    if(err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }
    
    res.render('app', { csrfToken: req.csrfToken(), domos: docs });
  });
}

var makeDomo = function(req, res) {
  if(!req.body.name || !req.body.age || !req.body.catchphrase) return res.status(400).json({ error: 'RAWR! Name and age are requried' });
  
  var domoData = {
    name: req.body.name,
    age: req.body.age,
    catchphrase: req.body.catchphrase,
    owner: req.session.account._id
  };
  
  var newDomo = new Domo.DomoModel(domoData);
  
  newDomo.save(function(err) {
    if(err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }
    
    res.json({ redirect: '/maker' });
  });
};

module.exports.makerPage = makerPage;
module.exports.make = makeDomo;