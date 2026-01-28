console.log('LOG: Script starting');
const https = require('https');
console.log('LOG: https required');

const data = JSON.stringify({
  contents: [{ parts: [{ text: "test" }] }]
});

const options = {
  hostname: 'generativelanguage.googleapis.com',
  port: 443,
  path: '/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBi5RRp2iJErr6kCkQ1z1KIGmnPu4AlMMI',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

console.log('LOG: Sending request');
const req = https.request(options, (res) => {
  console.log('LOG: Received response, status:', res.statusCode);
  res.on('data', (d) => {
    process.stdout.write(d);
  });
  res.on('end', () => {
    console.log('\nLOG: Response ended');
    process.exit(0);
  });
});

req.on('error', (e) => {
  console.error('LOG: Request error:', e);
  process.exit(1);
});

req.write(data);
req.end();
console.log('LOG: Request ended');
