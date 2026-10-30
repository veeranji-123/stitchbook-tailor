const { coreUrl, customerUrl, internalToken } = require('./config');

async function send(res, response) {
  const text = await response.text();
  res.status(response.status);
  res.type(response.headers.get('content-type') || 'application/json');
  return res.send(text);
}

async function forwardCore(req, res) {
  const headers = { 'content-type': 'application/json' };
  if (req.headers.authorization) headers.authorization = req.headers.authorization;
  try {
    const response = await fetch(`${coreUrl}${req.originalUrl}`, {
      method: req.method,
      headers,
      body: req.method === 'GET' || req.method === 'HEAD' ? undefined : JSON.stringify(req.body ?? {}),
    });
    return send(res, response);
  } catch (e) {
    return res.status(502).json({ error: 'Core service unavailable' });
  }
}

async function customerInternal(method, path, body) {
  return fetch(`${customerUrl}${path}`, {
    method,
    headers: {
      'content-type': 'application/json',
      'x-internal-token': internalToken,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
}

module.exports = { forwardCore, customerInternal, send };
