import http from 'http';
setTimeout(async () => {
  const req = http.get('http://localhost:6001/api/v1/health', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => console.log('Health:', data));
  });
  req.on('error', (e) => console.error(e));
  
  const req2 = http.get('http://localhost:6001/api/v1/does-not-exist', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => console.log('404:', data));
  });
  req2.on('error', (e) => console.error(e));
}, 2000);
