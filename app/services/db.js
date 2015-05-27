import Ember from 'ember';

var gui = require('nw.gui');
var path = require('path');
var fse = require('fs-extra');

var filename = path.join('./', 'data', 'db.nedb');
var db_path = path.join(process.env.HOME, '.huayra-quotes.nedb');

fse.copySync(filename, db_path);

var Datastore = require('nedb');
var db = new Datastore({filename: db_path, autoload: true});

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

  getById: function(id) {

    return new Ember.RSVP.Promise((resolve) => {
      this.get('db').find({id: id}, function(err, data) {
        if (data.length > 0) {
          resolve(data[0]);
        }
      });
    });

  },

  getByCategory: function(category) {
    return new Ember.RSVP.Promise((resolve) => {
      this.get('db').find({category: category}, function(err, data) {
        var array = Ember.A();

        data.forEach((d) => {
          array.pushObject(d);
        });

        resolve(array);
      });
    });
  }


});
