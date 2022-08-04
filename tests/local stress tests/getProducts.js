import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  // insecureSkipTLSVerify: true,
  // noConnectionReuse: false,
  stages: [
    { duration: '30s', target: 10 },
    { duration: '30s', target: 100 },
    { duration: '30s', target: 1000 }
  ]
  // scenarios: {
  //   constant_request_rate: {
  //     executor: 'constant-arrival-rate',
  //     rate: '300',
  //     timeUnit: '1s',
  //     //note: 1000 iterations per second
  //     duration: '30s',
  //     preAllocatedVUs: 250,
  //     maxVUs: 20000,
  //     exec: 'constant_rate'
  //   },
  //   low_traffic: {
  //     executor: 'ramping-vus',
  //     stages: [
  //       { duration: '30s', target: 100 },
  //       { duration: '30s', target: 500 },
  //       { duration: '30s', target: 1000 }
  //     ],
  //     exec: 'low_traffic'
  //   },
  //   high_traffic: {
  //     executor: 'ramping-vus',
  //     stages: [
  //       { duration: '30s', target: 100 },
  //       { duration: '30s', target: 500 },
  //       { duration: '30s', target: 5000 },
  //       { duration: '30s', target: 0}
  //     ],
  //     exec: 'high_traffic'
  //   }
  // },
  // thresholds: {
  //   http_req_duration: ['p(99)<=2000', 'p(95)<=1500', 'p(90)<=1000'],
  //   http_req_failed: ['rate<=0.01']
  // }
};

export default function getProducts() {
  const res = http.get('http://localhost:2525/products?count=1');
  check(res, {
    'status was 200': (r) => r.status === 200
    // 'data is correct format': (r) => {
    //   let parsed = JSON.parse(r.body);
    //   let { id, campus, name, slogan, description, category, default_price } = parsed[0];
    //   let tests = [
    //     id === 1,
    //     campus.length !== 0,
    //     (typeof name) === 'string',
    //     (typeof slogan) === 'string',
    //     (typeof description) === 'string',
    //     (typeof category) === 'string',
    //     (typeof default_price) === 'string',
    //   ];
    //   return tests.every((test) => !!test);
    // }
  });
  sleep(1);
};
