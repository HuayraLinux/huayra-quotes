import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    var id = params.id;
    var path = "data/" + id + ".txt";

    return new Ember.RSVP.Promise((resolve) => {

      $.get(path).then((data) => {
        resolve({
          data: data,
          path: path,
        });
      });

    });

  }
});
