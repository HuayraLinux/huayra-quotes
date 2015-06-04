import Ember from 'ember';

export default Ember.Route.extend({
  db: Ember.inject.service(),

  model: function() {
    return this.get('db').getByCategories();
  }
});
