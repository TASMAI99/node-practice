
const express = require('express');
const fs = require('node:fs/promises');

const app = express();

app.get('/products', async (req, res) => {
    try {
        const data = await fs.readFile(
            'products.json',
            'utf8'
        );

        const products = JSON.parse(data);
        const category = req.query.category;

        if (category) {
            const filteredProducts = products.filter(
                product => product.category === category
            );

            return res.json(filteredProducts);
        }

        res.json(products);
    } catch (error) {
        res.status(500).json({
            error: 'Failed to read products'
        });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
