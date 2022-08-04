import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 10 },
    { duration: '30s', target: 100 },
    { duration: '30s', target: 1000 }
  ]
};

export default function getStyles() {
  const res = http.get('http://localhost:2525/products/1/styles');
  check(res, {'status was 200': (r) => r.status === 200});
  sleep(1);
};
