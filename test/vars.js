/* eslint no-undef:0 */
/* eslint new-cap:0 */

module.exports = {
  secret: process.env.MIX_SECRET,
  query: function main() {
    return Events({
      from_date: '2016-07-09',
      to_date: '2016-07-10'
    })
      .filter(function(event) {
        return event.name === 'App launched';
      })
      .groupBy(['name'], mixpanel.reducer.count());
  },
  jqlObj: {
    key: ['App launched'],
    value: 92
  },
  funnelID: 1833977,
  funnelParams: {
    from_date: '2016-06-06',
    to_date: '2016-06-07'
  },
  funnelObj: {
    meta: {
      dates: [
        '2016-06-06',
        '2016-06-07'
      ]
    },
    data: {
      '2016-06-07': {
        steps: [
          {
            count: 84,
            step_conv_ratio: 1,
            goal: 'App launched',
            overall_conv_ratio: 1,
            avg_time: null,
            event: 'App launched'
          },
          {
            count: 79,
            step_conv_ratio: 0.9404761904761905,
            goal: 'Connection used',
            overall_conv_ratio: 0.9404761904761905,
            avg_time: 15,
            event: 'Connection used'
          },
          {
            count: 76,
            step_conv_ratio: 0.9620253164556962,
            goal: 'Deployment detected',
            overall_conv_ratio: 0.9047619047619048,
            avg_time: 5,
            event: 'Deployment detected'
          }
        ],
        analysis: {
          completion: 76,
          starting_amount: 84,
          steps: 3,
          worst: 1
        }
      },
      '2016-06-06': {
        steps: [
          {
            count: 76,
            step_conv_ratio: 1,
            goal: 'App launched',
            overall_conv_ratio: 1,
            avg_time: null,
            event: 'App launched'
          },
          {
            count: 73,
            step_conv_ratio: 0.9605263157894737,
            goal: 'Connection used',
            overall_conv_ratio: 0.9605263157894737,
            avg_time: 9,
            event: 'Connection used'
          },
          {
            count: 71,
            step_conv_ratio: 0.9726027397260274,
            goal: 'Deployment detected',
            overall_conv_ratio: 0.9342105263157895,
            avg_time: 5,
            event: 'Deployment detected'
          }
        ],
        analysis: {
          completion: 71,
          starting_amount: 76,
          steps: 3,
          worst: 1
        }
      }
    }
  }
};
