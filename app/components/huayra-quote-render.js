import Ember from 'ember';

function quoteRender(wikitext) {
  var miki = require('./miki.js');
  var render_opts = {
      anchors:[
          {re: /(<a href=\')(w:(.[^>]+))(\'>)/gi,
           sub:'<a class=\'a-out\' href=\'https://es.wikipedia.org/wiki/$3$4'},
          {re: /(<a href=\')((.[^w:>]+))(\'>)/gi,
           sub:'$1#/show/$2$4'}
      ]
  };
  miki.parse(wikitext);
  var html = miki.as_html(render_opts);

  return new Ember.Handlebars.SafeString(html);
}

export default Ember.Component.extend({
    datahtml: new Ember.Handlebars.SafeString('<img src="images/spiffygif_28x28.gif" alt="Cargando">'),
    actions: {
        isExternal: function(){}
    },
    didInsertElement: function() {
        var safehtml = quoteRender(this.get('data'));
        this.set('datahtml', safehtml);
        Ember.run.scheduleOnce('afterRender', this, function() {
            var anchors_out = this.$().children('.a-out');
            debugger;
            anchors_out.each(function(){
                $(this).addClass('is-external');
                $(this).on('click',
                           function(e){
                               console.log(this.href);
                               require('nw.gui').Shell.openExternal( this.href );
                               e.preventDefault();
                           });
            });
        });
    }
});
