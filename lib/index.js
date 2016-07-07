/**
 *
 * @api public
 */

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
        params.key = options.key;
      }
    }
  }
  var str = hitMixpanelAPI(secret, 'funnels', params);
  return str;
}

module.exports.mixpanelJQL = mixpanelJQL;
module.exports.mixpanelFunnel = mixpanelFunnel;
