import Ember from 'ember';

export function quoteRender(params, hash) {
  var miki = require('./miki.js');
  var txt = params[0];

  miki.parse(txt);
  var html = miki.as_html();

  return new Ember.Handlebars.SafeString(html);
}

export default Ember.HTMLBars.makeBoundHelper(quoteRender);
