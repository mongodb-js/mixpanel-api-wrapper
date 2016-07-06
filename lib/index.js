/**
 *
 * @api public
 */

var request = require('request');
var _ = require('highland');

function mixpanelJQL(secret, query) {
  var apiSecret = secret;
  var url = 'https://' + apiSecret + '@mixpanel.com/api/2.0/jql?script=' + encodeURIComponent(query);
  return _(function(push) {
    request.get(url, function(error, response, body) {
      if (error !== null) {
        push(error);
      } else {
        body = JSON.parse(body);
        for (var i = 0; i < body.length; ++i) {
          push(null, body[i]);
        }
      }
      push(null, _.nil);
    });
  });
}

module.exports.mixpanelJQL = mixpanelJQL;
