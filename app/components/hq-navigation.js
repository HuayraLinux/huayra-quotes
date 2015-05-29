import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNames: ['navigation-container'],
  inHistoryTransition: false,

  canBack: function() {
    return (this.get('step') > 0);
  }.property('step'),

  step: 0,

  updateStates: function() {

    window.onhashchange = function() {
      if (!this.get('inHistoryTransition')) {
        this.incrementProperty('step');
      }

      this.set('inHistoryTransition', false);

    }.bind(this);

  }.on('didInsertElement'),


  actions: {

    prev: function() {
      this.set('inHistoryTransition', true);
      this.decrementProperty('step');
      window.history.back();
    }

  }


});
