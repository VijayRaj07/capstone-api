import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 5,
  duration: '2m',

  thresholds: {
    http_req_failed: ['rate<0.001'],       // <0.1% errors
    http_req_duration: ['p(95)<400'],      // Correct syntax ✅
  },
};

export default function () {
  // Health endpoint
  const health = http.get('http://localhost:3000/health');
  check(health, {
    'health status is 200': (r) => r.status === 200,
    'health response time < 400ms': (r) => r.timings.duration < 400,
  });

  // Checkout endpoint
  const checkout = http.get('http://localhost:3000/checkout');
  check(checkout, {
    'checkout status is 200': (r) => r.status === 200,
    'checkout response time < 400ms': (r) => r.timings.duration < 400,
  });

  sleep(1);
}