import usersRoute from './users-route';
import productsRoute from './products-route';
import purchasesRoute from './purchases-route';

export default (app) => {

    // Products routes
    app.use('/products', productsRoute);

    // User routes
    app.use('/users', usersRoute);

    // Purchases routes
    app.use('/purchases',purchasesRoute);
        
};
