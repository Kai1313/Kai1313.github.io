const http = require('http');

const endpoints = [
  '/',
  '/assets/avatar.png'
];

async function checkUrl(path) {
  return new Promise((resolve) => {
    http.get(`http://localhost:3000${path}`, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        resolve({
          path,
          statusCode: res.statusCode,
          size: data.length
        });
      });
    }).on('error', (err) => {
      resolve({ path, error: err.message });
    });
  });
}

async function run() {
  console.log('--- Verifying Local Endpoints ---');
  for (const ep of endpoints) {
    const result = await checkUrl(ep);
    if (result.error) {
      console.log(`[FAIL] ${ep} -> Error: ${result.error}`);
    } else if (result.statusCode === 200) {
      console.log(`[PASS] ${ep} -> Status ${result.statusCode} (${result.size} bytes)`);
    } else {
      console.log(`[WARN] ${ep} -> Status ${result.statusCode}`);
    }
  }
}

run();
