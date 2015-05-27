import Ember from 'ember';

export default Ember.Route.extend({
  db: Ember.inject.service(),

  model: function(params) {
    var id = params.id;
    var path = "data/" + id + ".txt";

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
        });

      })

    });

  }
});
