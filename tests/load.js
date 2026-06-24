import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '5m', target: 100 },   // Ramp up to 100 VUs
    { duration: '10m', target: 100 },  // Stay at 100 VUs
    { duration: '5m', target: 0 },     // Ramp down
  ],

  thresholds: {
    http_req_failed: ['rate<0.001'],                // <0.1% errors
    http_req_duration: ['p(95)<400', 'p(99)<500'],  // Correct syntax ✅
  },
};

export default function () {
  // Health endpoint
  const health = http.get('http://localhost:3000/health');
  check(health, {
    'health status is 200': (r) => r.status === 200,
    'health response time OK': (r) => r.timings.duration < 400,
  });

  // Checkout endpoint
  const checkout = http.get('http://localhost:3000/checkout');
  check(checkout, {
    'checkout status is 200': (r) => r.status === 200,
    'checkout response time OK': (r) => r.timings.duration < 400,
  });

  // Products endpoint
  const products = http.get('http://localhost:3000/products');
  check(products, {
    'products status is 200': (r) => r.status === 200,
    'products response time OK': (r) => r.timings.duration < 400,
  });

  sleep(1);
}