# mixpanel-api-wrapper [![travis][travis_img]][travis_url] [![npm][npm_img]][npm_url]

> wrapper around the mixpanel data export API to create an easy interface for retrieiving the results of JQL queries and funnel data in Mixpanel

## Install

```js
npm install mixpanel-api-wrapper
```

## Example

```js
var mixpanel = require('mixpanel-api-wrapper');

//retrieve results from JQL query
var results1 = mixpanel.mixpanelJQL(<apiSecret>, <jqlQuery>);

//retrieve results from hitting funnels endpoint of API
var results2 = mixpanel.mixpanelFunnel(<apiSecret>, <funnelID>);
```

## License

Apache 2.0

[travis_img]: https://img.shields.io/travis/mongodb-js/mixpanel-jql.svg
[travis_url]: https://travis-ci.org/mongodb-js/mixpanel-jql
[npm_img]: https://img.shields.io/npm/v/mixpanel-jql.svg
[npm_url]: https://npmjs.org/package/mixpanel-jql
