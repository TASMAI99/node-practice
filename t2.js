const express = require('express');
const fs = require('node:fs/promises');

const app = express();

app.use(express.json());

app.post('/log', async (req, res) => {
    try {
        // TODO 3: Read the message from req.body
        const message = req.body.message;

        // TODO 4: Create a record with message and timestamp
        const record = {
            message: message,
            timestamp: new Date().toISOString()
        };

        // TODO 5: Convert the record to JSON and add a newline
        const logEntry = JSON.stringify(record) + '\n';

        // TODO 6: Append the record to app.log
        await fs.appendFile('app.log', logEntry, 'utf8');

        // TODO 7: Respond with { saved: true }
        res.status(200).json({ saved: true });

    } catch (error) {
        console.error('Failed to save log:', error);

        res.status(500).json({
            saved: false,
            error: 'Failed to save log'
        });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});