import Ember from 'ember';

export default Ember.Controller.extend({
  q: "",
  
  canSearch: function() {
    return (this.get('q').length > 2);
  }.property('q'),

  actions: {
    search: function() {
      if (this.get('canSearch')) {
        this.controllerFor('result').search(this.get('q'));
        this.transitionToRoute('result', this.get('q'));
      }
    }
  }
});
