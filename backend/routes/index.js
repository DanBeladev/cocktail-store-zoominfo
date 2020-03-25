// import notebook from '../controllers/notebookController';
import products from '../controllers/productsController';
import users from '../controllers/usersController'
import usersRoute from './users-route';
import productsRoute from './products-route';

export default (app) => {
    // app.route('/notes')
    //     .get(notebook.getAllNotes)
    //     .post(notebook.createNote);

    // app.route('/notes/:noteId')
    //     .get(notebook.getNote)
    //     .put(notebook.updateNote)
    //     .delete(notebook.deleteNote);

    // app.route('/')
    // .get(notebook.arrivedNotes)

    //  app.route('/products')
    //     .get(products.getProductsFromMemory)

    // Products routes

    app.use('/products', productsRoute);
    // app.route('/products')
    //     .get((req, res) => {
    //         res.send(products.getProductsFromMemory());
    //     })


    // User routes
    app.use('/users', usersRoute);
        
};
