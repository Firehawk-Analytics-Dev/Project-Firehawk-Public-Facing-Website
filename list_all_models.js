const https = require('https');

const options = {
  hostname: 'generativelanguage.googleapis.com',
  port: 443,
  path: '/v1beta/models?key=AIzaSyBi5RRp2iJErr6kCkQ1z1KIGmnPu4AlMMI',
  method: 'GET'
};

const req = https.request(options, (res) => {
  let body = '';
  res.on('data', (d) => {
    body += d;
  });
  res.on('end', () => {
    const data = JSON.parse(body);
    const flashModels = data.models.filter(m => m.name.includes('flash'));
    console.log(JSON.stringify(flashModels, null, 2));
  });
});

req.on('error', (e) => {
  console.error(e);
});

req.end();
