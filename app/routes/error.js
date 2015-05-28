import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return {
      message: params.message,
    }
  }
});
