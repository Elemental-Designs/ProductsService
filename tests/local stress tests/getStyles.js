import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter, Rate } from 'k6/metrics';

// export const options = {
//   stages: [
//     { duration: '30s', target: 10 },
//     { duration: '30s', target: 100 },
//     { duration: '30s', target: 1000 }
//   ]
// };

// export default function getStyles() {
//   const res = http.get('http://localhost:2525/products/1/styles');
//   check(res, {'status was 200': (r) => r.status === 200});
//   sleep(1);
// };

export const requests = new Counter('http_reps');
export const failureRate = new Rate('failed_requests');
export const options = {
  scenarios: {
    constant_request_rate: {
        executor: 'constant-arrival-rate',
        rate: 100,
        timeUnit: '1s',
        duration: '30s',
        preAllocatedVUs: 100,
        maxVUs: 600,
    }
  },
  thresholds: {
    failed_requests: ['rate < 0.01'],
    http_req_duration: ['p(100) < 2000']
  }
}
const baseUrl = 'http://localhost:3000/products/100000/styles';
const generateId = () => Math.floor(Math.random() * (1000011 - 900000) + 900000);
export default function () {
  const url = `${baseUrl}/${generateId()/styles}`;
  const res = http.get(baseUrl);
  check(res, {
    'is status 200': (r) => r.status == 200,
    'transaction time < 200ms': r => r.timings.duration < 200,
    'transaction time < 500ms': r => r.timings.duration < 500,
    'transaction time < 1000ms': r => r.timings.duration < 1000,
    'transaction time < 2000ms': r => r.timings.duration < 2000,
  });
}
