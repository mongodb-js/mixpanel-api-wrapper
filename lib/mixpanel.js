/* eslint handle-callback-err:0 */

var request = require('request');
var _ = require('highland');

function addParams(url, params) {
  for (var key in params) {
    if (params.hasOwnProperty(key)) {
      url += key + '=' + encodeURIComponent(params[key]) + '&';
    }
  }
  url = url.slice(0, -1);
  return url;
}

function hitMixpanelAPI(secret, type, params) {
  var apiSecret = secret;
  var url = 'https://' + apiSecret + '@mixpanel.com/api/2.0/' + type + '?';
  url = addParams(url, params);
  return _(function(push) {
    request.get(url, function(error, response, body) {
      body = JSON.parse(body);
      if (body.error !== undefined) {
        push(new Error(body.error));
      } else if (type === 'jql') {
        for (var i = 0; i < body.length; ++i) {
          push(null, body[i]);
        }
      } else if (type === 'funnels') {
        push(null, body);
      }
      push(null, _.nil);
    });
  });
}

module.exports = hitMixpanelAPI;
