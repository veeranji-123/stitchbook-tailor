const express = require('express');
const cors = require('cors');
const { port, corsOrigin } = require('./config');
const routes = require('./routes');

const app = express();
app.use(cors({ origin: corsOrigin }));
app.use(express.json({ limit: '1mb' }));
app.get('/', (req, res) => res.json({ service: 'stitchbook-tailor', status: 'ok' }));
app.use('/api', routes);

app.listen(port, () => {
  console.log(`stitchbook-tailor listening on ${port}`);
});
