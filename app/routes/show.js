import Ember from 'ember';
var slug = nodeRequire('slug');

export default Ember.Route.extend({
  db: Ember.inject.service(),

  model: function(params) {
    var id = slug(params.id);
    var path = "data/" + slug(id) + ".txt";

    return new Ember.RSVP.Promise((resolve) => {

      this.get('db').getById(id)
        .then((record) => {

          $.get(path)
            .then((data) => {
              resolve({
                data: data,
                path: path,
                record: record,
                redirect: record.redirect
              });
            })
            .fail(() => {
              resolve({
                data: null,
                path: path,
                record: record,
                redirect: record.redirect,
              });
            });

        });
    });

  },
  afterModel: function(record) {
    if( record.redirect ){
      this.transitionTo('show', record.redirect);
    }
  }
});
