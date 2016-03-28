import Ember from 'ember';

export default Ember.Service.extend({
  db: null,
  index_collection: null,
  error: "",

  load: function() {
    var loki = nodeRequire('lokijs');
    var db = new loki('data/db.json'); // jshint ignore:line

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
        if (!d.redirect) {
          arr_uniq.pushObject(d);
        }
      });

      arr_uniq.uniq();

      var array = Ember.A();

      arr_uniq.forEach((d) => {
        var c;
        if (d.redirect) {
          c = self.get('index_collection').find({redirect: d.redirect});
        }

        array.pushObject(d);
      });

      /*var parcial = */ data.map(function(d) {
        var c;

        if (d.redirect) {
          c = self.get('index_collection').find({redirect: d.redirect});
        }

        return c;
      });

      //console.log("PARCIAL", parcial);
      //console.log("resultados", array);

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

  getByCategory: function(category/*, page, limit*/) {

    return new Ember.RSVP.Promise((resolve) => {
      var data = this.get('index_collection').find({category: category});
      var array = Ember.A();

      data.forEach((d) => {

          array.pushObject(d);

      });

      resolve({items: array, category: category});
    });
  },

  getCategories: function(page, limit) {
    var counter = 0;
    var selected = 0;

    return new Ember.RSVP.Promise((resolve) => {
      var data = this.get('index_collection').find({});
      var array = Ember.A();

      data.forEach((d) => {

        if (counter > page * 30 && selected < limit) {

          if (d.category && array.indexOf(d.category) === -1) {
            array.pushObject(d.category);
            selected += 1;
          }

        }

        counter += 1;

      });

      resolve({categories: array});
    });
  },

  getPagesOfCategories() {
    return new Ember.RSVP.Promise((resolve) => {
      var data = this.get('index_collection').find({});
      resolve(parseInt(data.length / 30, 10));
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
