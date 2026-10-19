import express from 'express';
import { readFile, writeFile } from 'node:fs/promises';

const app = express();

// Write your DELETE /tasks/:id route here
app.delete('/tasks', async(req, res) =>{
  try{
    // 1. Get the task ID from the URL
        const taskId = req.params.id;

        // 2. Read existing tasks
        const data = await readFile('tasks.json', 'utf8');
        const tasks = JSON.parse(data);

        // 3. Find the task to delete
        const taskToDelete = tasks.find(task => task.id === taskId);

        // 4. If the task doesn't exist, return 404
        if (!taskToDelete) {
            return res.status(404).json({
                deleted: false,
                error: 'Task not found'
            });
        }

        // 5. Create a new array without the task
        const updatedTasks = tasks.filter(task => task.id !== taskId);

        // 6. Save the updated array to the file
        await writeFile(
            'tasks.json',
            JSON.stringify(updatedTasks, null, 2),
            'utf8'
        );

        // 7. Send the success response
        return res.status(200).json({
            deleted: true,
            task: taskToDelete
        });

    } catch (error) {
        // 8. Handle unexpected errors
        console.error('Error deleting task:', error);

        if (error.code === 'ENOENT') {
            return res.status(404).json({
                deleted: false,
                error: 'Tasks file not found'
            });
        }

        return res.status(500).json({
            deleted: false,
            error: 'Internal server error'
        });
    }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});