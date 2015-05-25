import Ember from 'ember';
var wiky = require('wiky.js');

export function quoteRender(params, hash) {
  var html = wiky.process(params[0], {});
  return new Ember.Handlebars.SafeString(html);
}

export default Ember.HTMLBars.makeBoundHelper(quoteRender);
