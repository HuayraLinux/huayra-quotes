import Ember from 'ember';
var slug = require('slug');

export default Ember.Route.extend({
  db: Ember.inject.service(),

  model: function(params) {
    var id = slug(params.id);
    var path = "data/" + slug(id) + ".txt";

    return new Ember.RSVP.Promise((resolve) => {

      Ember.RSVP.Promise.all([
        $.get(path),
        this.get('db').getById(id),
      ]).then((results) => {

        var data = results[0];
        var record = results[1];

        resolve({
          data: data,
          path: path,
          record: record,
          redirect: record.redirect,
        });

      })

    });

  },
  afterModel: function(record, transition) {
    if( record.redirect ){
      this.transitionTo('show', record.redirect);
    }
  }
});
