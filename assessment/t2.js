
const express = require('express');
const fs = require('node:fs/promises');

const app = express();

app.use(express.json());

app.post('/log', async (req, res) => {
    try {
        const message = req.body.message;

        if (typeof message !== 'string' || !message.trim()) {
            return res.status(400).json({
                error: 'Message is required'
            });
        }

        const logEntry = {
            message: message,
            timestamp: new Date().toISOString()
        };

        await fs.appendFile(
            'app.log',
            JSON.stringify(logEntry) + '\n',
            'utf8'
        );

        res.json({ saved: true });
    } catch (error) {
        res.status(500).json({
            error: 'Failed to save log'
        });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
