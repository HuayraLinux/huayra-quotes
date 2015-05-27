import Ember from 'ember';

export default Ember.Route.extend({
  db: Ember.inject.service(),

  model: function(params) {
    var category = params.id;
    return this.get('db').getByCategory(category);
  },

});
