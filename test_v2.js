const https = require('https');

const data = JSON.stringify({
  contents: [{ parts: [{ text: "test" }] }]
});

const options = {
  hostname: 'generativelanguage.googleapis.com',
  port: 443,
  path: '/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBi5RRp2iJErr6kCkQ1z1KIGmnPu4AlMMI',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = https.request(options, (res) => {
  console.log('STATUS:', res.statusCode);
  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (e) => {
  console.error(e);
});

req.write(data);
req.end();
