import Ember from 'ember';

export default Ember.Route.extend({
  db: Ember.inject.service(),

  reiniciar: function() {
    console.log("ACTIVATE");
  }.on('activate')

});
