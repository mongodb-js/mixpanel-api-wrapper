require('dotenv').config();
var mixpanel = require('../');
var assert = require('assert');
var sinon = require('sinon');
var request = require('request');
var vars = require('./vars.js');

var secret = vars.secret;

describe('functional tests', function() {
  it('should work', function() {
    assert(mixpanel);
  });

  it('jql functional test', function(done) {
    var query = vars.query;
    var jqlObj = vars.jqlObj;
    var str = mixpanel.mixpanelJQL(secret, query);
    str.on('data', function(chunk) {
      assert.deepEqual(chunk, jqlObj);
    });
    str.on('end', function() {
      done();
    });
  });

  it('funnels functional test', function(done) {
    var funnelID = vars.funnelID;
    var funnelObj = vars.funnelObj;
    var params = vars.funnelParams;
    var str = mixpanel.mixpanelFunnel(secret, funnelID, params);
    str.on('data', function(chunk) {
      assert.deepEqual(chunk, funnelObj);
    });
    str.on('end', function() {
      done();
    });
  });
});

describe('unittests jql', function() {
  before(function(done) {
    sinon.stub(request, 'get').yields(null, null, JSON.stringify(vars.jqlObj));
    done();
  });

  after(function(done) {
    request.get.restore();
    done();
  });

  it('should work', function() {
    assert(mixpanel.mixpanelJQL);
  });

  it('should return a stream', function() {
    var str = mixpanel.mixpanelJQL();
    assert(str.pipe);
    assert(str.on);
  });

  it('should return a stream with the value of request.get', function(done) {
    var str = mixpanel.mixpanelJQL();
    str.on('data', function(chunk) {
      assert.deepEqual(chunk, vars.jqlObj);
    });
    str.on('end', function() {
      done();
    });
  });
});

describe('unittests funnels', function() {
  before(function(done) {
    sinon.stub(request, 'get').yields(null, null, JSON.stringify(vars.funnelObj));
    done();
  });

  after(function(done) {
    request.get.restore();
    done();
  });

  it('should work', function() {
    assert(mixpanel.mixpanelFunnel);
  });

  it('should return a stream', function() {
    var str = mixpanel.mixpanelFunnel();
    assert(str.pipe);
    assert(str.on);
  });

  it('should return a stream with the value of request.get', function(done) {
    var str = mixpanel.mixpanelFunnel();
    str.on('data', function(chunk) {
      assert.deepEqual(chunk, vars.funnelObj);
    });
    str.on('end', function() {
      done();
    });
  });
});
