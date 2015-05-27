import Ember from 'ember';

export default Ember.Component.extend({
  hasCategory: function() {
    if (this.get('category')) {
      return true;
    } else {
      return false;
    }
  }.property('category')
});
