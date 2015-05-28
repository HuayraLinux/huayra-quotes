import Ember from 'ember';

export default Ember.Route.extend({
  db: Ember.inject.service(),

  load: function() {
    this.get('db').init();

    var error = this.get('db.error');

    if (error) {
      alert(error);
      this.transitionTo('error', error);
    }

  }.on('init'),

});
