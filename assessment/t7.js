import express from 'express';
import { readFile } from 'node:fs/promises';

const app = express();

app.get('/stats', async(req, res) =>{
    try{
        const [userData, orderData, productData] = await Promise.all([
            readFile('user.json', 'utf8'),
            readFile('orders.json', 'utf8'),
            readFile('products.json', 'utf8')
        ])
        const users = JSON.parse(usersData);
        const orders = JSON.parse(ordersData);
        const products = JSON.parse(productsData);

        res.json({
            users: users.length,
            orders: orders.length,
            products: products.length
    })
    }
    catch(error){
        res.status(500).json({
            error: 'Failed to read stats'
        })
    }
})

app.listen(3000, () => {
    console.log('Server is running on 3000 port')
})