
import express from 'express';

const app = express();

// function requestLogger(req, res, next) {
//     const startTime = Date.now();

//     res.on('finish', () => {
//         const totalTime = Date.now() - startTime;

//         console.log(
//             `${req.method} ${req.originalUrl} ${totalTime}ms`
//         );
//     });

//     next();
// }

// app.use(requestLogger);

app.get('/users', (req, res) => {
    res.json([
        { id: 1, name: 'Rahul' },
        { id: 2, name: 'Amit' }
    ]);
    const startTime = Date.now();
        res.on('finish', () => {
        const totalTime = Date.now() - startTime;

        console.log(`${req.method} ${req.originalUrl} ${totalTime}ms`)
        })

})

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
