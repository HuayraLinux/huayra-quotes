import Ember from 'ember';

export function quoteRender(params, hash) {
  var miki = require('./miki.js');
  var render_opts = {
      anchors:[
          {re: /(<a href=\')(w:(.[^>]+))(\'>)/gi, sub:'$1http://es.wikipedia.org/wiki/$3$4'},
          {re: /(<a href=\')((.[^w:>]+))(\'>)/gi, sub:'$1#/show/$2$4'}
      ]
  };
  var txt = params[0];

  miki.parse(txt);
  var html = miki.as_html(render_opts);

  return new Ember.Handlebars.SafeString(html);
}

export default Ember.HTMLBars.makeBoundHelper(quoteRender);
