import Ember from 'ember';

export default Ember.Route.extend({
  db: Ember.inject.service(),
  currentPage: 0,

  model: function(params) {
    this.set('currentPage', params.page);

    var promises = {
      categories: this.get('db').getCategories(params.page, 30),
      pages: this.get('db').getPagesOfCategories()
    };

    return Ember.RSVP.hash(promises);
  },

  setupController: function(controller, model) {
    controller.setPage(this.get('currentPage'), model.pages);
    controller.set('model', model);
  },

});
