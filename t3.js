import express from 'express';
import fs from 'node:fs/promises';
import { randomUUID } from 'node:crypto';

const app = express();

app.use(express.json());

app.post('/tasks',  async (req, res) => {
    try{
         const { title, completed } = req.body;

         if (!title || typeof title !== 'string' || title.trim() === '') {
            res.status(400).json({ error: 'Title is required and cannot be empty.' });
        }

        let tasks = [];

        const data = await fs.readFile('tasks.json', 'utf8')
         tasks = JSON.parse(data);

         try {
            const data = await fs.readFile('tasks.json', 'utf8');
            tasks = JSON.parse(data);
        } catch (error) {
            if (error.code !== 'ENOENT') {
                throw error;
            }
        }

        const newTask = {
            id: randomUUID(),
            title: title.trim(),
            completed: completed === true,
            createdAt: new Date().toISOString()
        };

        tasks.push(newTask);

        await fs.writeFile(
            'tasks.json',
            JSON.stringify(tasks, null, 2),
            'utf8'
        );

        return res.status(201).json({
            saved: true,
            task: newTask
        });

    } catch (error) {
        console.error('Error saving task:', error);

        return res.status(500).json({
            saved: false,
            error: 'Internal server error'
        });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
