import express from 'express';
import { uptime } from 'node:process';
const app = express();

app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK' ,
    uptime: uptime()
  });

});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});