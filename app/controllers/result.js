import Ember from 'ember';

export default Ember.Controller.extend({
  db: Ember.inject.service(),

  working: false,
  result: [],

  count: function() {
    return this.get('result').length;
  }.property('result'),

  empty: function() {
    return (this.get('count') === 0);
  }.property('count'),

  search: function(q) {
    this.set('working', true);

    this.get('db').search(q).then((result) => {
      this.set('result', result);
      this.set('working', false);
    });

  }
});
