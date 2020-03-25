// import notebook from '../controllers/notebookController';
import products from '../controllers/productsController';
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

     app.route('/products')
        .get(products.getRandomProducts)
};
