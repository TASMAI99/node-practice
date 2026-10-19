
const express = require('express');
const { uptime } = require('node:process');

const app = express();

app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        uptime: uptime()
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
