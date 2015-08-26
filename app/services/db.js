import Ember from 'ember';

var gui = require('nw.gui');
var path = require('path');
var fse = require('fs-extra');

var db_path = path.join('./', 'data', 'db.json');

export default Ember.Service.extend({
  db: null,
  index_collection: null,
  error: "",

  load: function() {
    var loki = require('lokijs');
    var db = new loki('data/db.json');

    var promise = new Ember.RSVP.Promise((resolve) => {
      db.loadDatabase({}, () => {
        var index_collection = db.getCollection("index");
        this.set('db', db);
        this.set('index_collection', index_collection);
        resolve();
      });
    });

    return promise;
  },

  search: function(q) {
    return new Ember.RSVP.Promise((resolve) => {
      var regex = new RegExp(q, 'i');
      var self = this;

      var data = this.get('index_collection').find({title: {$regex: regex},
                                                    slug: {$regex: regex},});

      var arr_uniq = Ember.A();
      data.forEach((d) => {
        if( !d.redirect ){
          arr_uniq.pushObj(d);
        }
      });
      arr_uniq.uniq();


      var array = Ember.A();

      arr_uniq.forEach((d) => {
        var c;
        if( d.redirect ){
          c = self.get('index_collection').find({redirect: d.redirect});
        }
        //array.pushObject(d);
      });


      // var array = Ember.A();

      // data.forEach((d) => {
      //   array.pushObject(d);
      // });

      var pete = data.map(function(d){
        var c;
        if( d.redirect ){
          c = self.get('index_collection').find({redirect: d.redirect});
        }

        return c;
      });

      console.log("PETE", pete);
      console.log("resultados", array);

      resolve(array);

    });
  },

  getById: function(id) {
    /*
      TODO, agregar reject en caso de falla.
    */
    return new Ember.RSVP.Promise((resolve) => {
      var data = this.get('index_collection').find({id: id});

      if (data.length > 0) {
          resolve(data[0]);
      }

    });

  },

  getByCategory: function(category) {
    return new Ember.RSVP.Promise((resolve) => {
      var data = this.get('index_collection').find({category: category});
      var array = Ember.A();

      data.forEach((d) => {
        array.pushObject(d);
      });

      resolve({items: array, category: category});
    });
  },

  getCategories: function() {
    return new Ember.RSVP.Promise((resolve) => {
      var data = this.get('index_collection').find({});
      var array = Ember.A();

      data.forEach((d) => {
        if (d.category && array.indexOf(d.category) === -1) {
          array.pushObject(d.category);
        }
      });

      resolve({categories: array});
    });
  },

  getCategoriesByPage: function(pageIndex) {
    return new Ember.RSVP.Promise((resolve) => {
      var collection = this.get('index_collection');
      var data = collection.where().offset(pageIndex*10).limit(10).data();
      var array = Ember.A();

      data.forEach((d) => {
        if (d.category && array.indexOf(d.category) === -1) {
          array.pushObject(d.category);
        }
      });

      resolve({categories: array});
    });
  },


});
