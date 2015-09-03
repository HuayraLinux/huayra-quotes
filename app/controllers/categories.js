import Ember from 'ember';

export default Ember.Controller.extend({
  currentPage: 0,
  pages: 0,

  isFirstPage: function() {
    return (this.get('currentPage') == 0);
  }.property('currentPage'),

  isLastPage: function() {
    return (this.get('currentPage') == this.get('pages'));
  }.property('currentPage', 'pages'),


  setPage(page, pages) {
    this.set('currentPage', page);
    this.set('pages', pages);
  },

  actions: {
    nextPage() {
      this.transitionToRoute('categories', parseInt(this.get('currentPage'), 10) + 1);
    },

    previousPage() {
      var page = parseInt(this.get('currentPage'), 10);

      if (page > 0) {
        this.transitionToRoute('categories', page - 1);
      }
    }
  }
});
