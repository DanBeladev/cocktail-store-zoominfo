import app from './app';
import products from './controllers/productsController';

const port = process.env.PORT || '3000';

app.listen(port, () => {
    products.initializeProducts();
    console.log(`Server is up and listening on port: ${port}`);
});

console.log(`Listening on port ${port}`);
