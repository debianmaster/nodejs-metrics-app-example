const express = require('express');
const client = require('prom-client');
const collectDefaultMetrics = client.collectDefaultMetrics;

const app = express();
const port = 3000;

// Probe every 5th second.
collectDefaultMetrics({ timeout: 5000 });

const counter = new client.Counter({
    name: 'node_requests_total',
    help: 'Total number of requests',
});

app.get('/', (req, res) => {
    counter.inc();
    res.send('Hello World!');
});

app.get('/metrics', async (req, res) => {
    res.set('Content-Type', client.register.contentType);
    const metrics = await client.register.metrics(); // Only if it is actually a Promise
    res.end(metrics);
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

