/* eslint handle-callback-err:0 */

var request = require('request');
var _ = require('highland');

/*  Function to query the Mixpanel API - generic so as to
** allow flexibility to hit different endpoints. Returns data retrieved
** in a stream. Currently capable of handling the 'jql' and 'funnels'
** endpoints.
** @param {string} secret API Secret from Mixpanel account
** @param {string} type Endpoint to hit ('jql' or 'funnels')
** @param {object} params Query parameters added onto url
** @return {stream} Returns stream with data returned by API call
*/
function hitMixpanelAPI(secret, type, params) {
  var apiSecret = secret;
  var url = 'https://' + apiSecret + '@mixpanel.com/api/2.0/' + type;
  return _(function(push) {
    request.get({
      url: url,
      qs: params
    }, function(error, response, body) {
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
