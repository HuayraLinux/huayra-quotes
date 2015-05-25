import Ember from 'ember';

export default Ember.Route.extend({
  db: Ember.inject.service(),

  load: function() {
    this.get('db').init();
  }.on('init'),

});
