import Ember from 'ember';
var gui = require('nw.gui');
var path = require('path');

var Datastore = require('nedb');
var filename = path.join('data', 'db.nedb');
var db = new Datastore({filename: filename, autoload: true});

window.db = db;

export default Ember.Service.extend({
  db: null,

  init: function() {
    this.set('db', db);
  },

  search: function(q) {
    return new Ember.RSVP.Promise((resolve) => {
      var regex = new RegExp(q, 'i');

      this.get('db').find({title: regex}, function(err, data) {

        var array = Ember.A();

        data.forEach((d) => {
          array.pushObject(d);
        });

        resolve(array);
      });

    });
  },

});
