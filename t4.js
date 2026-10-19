import express from 'express';
import { readFile } from 'node:fs/promises';

const app = express();

// Write your GET /tasks route here

app.get('/tasks', async(req, res) =>{
    try{
        let tasks = [];
        
        const data = await readFile('tasks.json', 'utf8')
        tasks = JSON.parse(data);

                return res.status(200).json({
            tasks: tasks
        });

    }
    catch(error){

        if (error.code === 'ENOENT') {
            return res.status(200).json({
                tasks: []
            });
        }

         console.error('Error reading task:', error);

        return res.status(500).json({
            saved: false,
            error: 'Internal server error'
        });
    }
})

app.listen(3000, () => {
  console.log('Server running on port 3000');
});