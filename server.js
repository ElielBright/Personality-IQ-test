const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const API_KEY = process.env.REACT_APP_OLLAMA_API_KEY || '';
const TARGET = process.env.OLLAMA_PROXY_TARGET || 'https://ollama.com';
const PORT = process.env.PORT || 3001;
const BUILD_DIR = path.join(__dirname, 'build');

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json',
};

function proxyRequest(reqBody) {
  return new Promise((resolve, reject) => {
    const targetUrl = new URL(TARGET);
    const options = {
      hostname: targetUrl.hostname,
      port: 443,
      path: '/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(reqBody),
        'Authorization': `Bearer ${API_KEY}`,
      },
    };

    const proxyReq = https.request(options, (proxyRes) => {
      const chunks = [];
      proxyRes.on('data', chunk => chunks.push(chunk));
      proxyRes.on('end', () => {
        resolve({
          statusCode: proxyRes.statusCode,
          headers: proxyRes.headers,
          body: Buffer.concat(chunks).toString('utf-8'),
        });
      });
    });

    proxyReq.on('error', reject);
    proxyReq.end(reqBody);
  });
}

function serveStatic(req, res) {
  let filePath = path.join(BUILD_DIR, req.url === '/' ? 'index.html' : req.url);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(BUILD_DIR, 'index.html');
  }
  const ext = path.extname(filePath);
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal server error');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, CORS_HEADERS);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url.startsWith('/v1/chat/completions')) {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const result = await proxyRequest(body);
        const responseHeaders = {
          ...CORS_HEADERS,
          'Content-Type': result.headers['content-type'] || 'application/json',
        };
        res.writeHead(result.statusCode, responseHeaders);
        res.end(result.body);
      } catch (err) {
        res.writeHead(500, { ...CORS_HEADERS, 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  if (fs.existsSync(BUILD_DIR)) {
    serveStatic(req, res);
  } else {
    res.writeHead(404, { ...CORS_HEADERS, 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found. Build the app first or run in development mode.' }));
  }
});

server.listen(PORT, () => {
  console.log(`Ollama proxy running on http://localhost:${PORT}`);
  if (fs.existsSync(BUILD_DIR)) {
    console.log(`Serving static files from ${BUILD_DIR}`);
  } else {
    console.log('No build folder found — proxy mode only. Run npm run build to serve static files.');
  }
});
