import Ember from 'ember';

export default Ember.Route.extend({
  db: Ember.inject.service(),

  model: function(params) {
    return this.get('db').getCategories();
  }
});
