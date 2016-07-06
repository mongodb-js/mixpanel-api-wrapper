/**
 *
 * @api public
 */
var MixpanelExport = require('mixpanel-data-export');
var _ = require('highland');
function mixpanelJQL(key, secret, query) {
  var panel = new MixpanelExport({
    api_key: key,
    api_secret: secret
  });
  return _(function(push) {
    panel.get('jql', {
      script: query
    }, function(data) {
      if (data.error !== undefined) {
        push(data.error);
      } else {
        for (var i = 0; i < data.length; ++i) {
          push(null, data[i]);
        }
      }
      push(null, _.nil);
    });
  });
}

function today() {
  function zeropad(num) {
    var str = num.toString();
    if (str.length < 2) {
      str = '0' + str;
    }
    return str;
  }
  var date = new Date();
  var string = '';
  string += date.getFullYear() + '-' + zeropad(date.getMonth()) + '-' + zeropad(date.getDate());
  return string;
}

function mixpanelFunnel(key, secret, id) {
  var panel = new MixpanelExport({
    api_key: key,
    api_secret: secret
  });
  return _(function(push) {
    panel.get('funnels', {
      funnel_id: id,
      from_date: '2016-01-01',
      to_date: today(),
      interval: 7
    }, function(data) {
      console.log(data.data);
      if (data.error !== undefined) {
        push(data.error);
      } else {
        for (var i = 0; i < data.data.length; ++i) {
          push(null, data.data[i]);
        }
      }
      push(null, _.nil);
    });
  });
}

module.exports.mixpanelJQL = mixpanelJQL;
module.exports.mixpanelFunnel = mixpanelFunnel;
