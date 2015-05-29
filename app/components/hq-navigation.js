import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNames: ['navigation-container'],
  canBack: false,
  canForward: false,

  updateStates: function() {
    console.log("update!");
  }.on('didInsertElement'),
  
});
