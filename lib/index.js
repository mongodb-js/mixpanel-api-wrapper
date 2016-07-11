/**
 *
 * @api public
 */

var hitMixpanelAPI = require('./mixpanel.js');

function mixpanelJQL(secret, query) {
  var params = {
    script: query
  };
  var str = hitMixpanelAPI(secret, 'jql', params);
  return str;
}

function mixpanelFunnel(secret, funnelID, options) {
  var params = {
    funnel_id: funnelID
  };
  if (options !== undefined) {
    for (var key in options) {
      if (options.hasOwnProperty(key)) {
        params[key] = options[key];
      }
    }
  }
  var str = hitMixpanelAPI(secret, 'funnels', params);
  return str;
}

module.exports.mixpanelJQL = mixpanelJQL;
module.exports.mixpanelFunnel = mixpanelFunnel;
