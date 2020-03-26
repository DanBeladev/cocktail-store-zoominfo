import request from "request";
import {NUMBER_OF_PRODUCTS, RANDOM_DRINK_URL} from '../common/constants'
//const RANDOM_DRINK_URL ='https://www.thecocktaildb.com/api/json/v1/1/random.php';

// Data Members
let products = [];

// Functions
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

/**
 * 
 */
const getProductsFromMemory = (req,res) => res.send(products);

/**
 * 
 * @param {*} numberOfProducts 
 */
const initializeProducts = () => {
    getProducts(NUMBER_OF_PRODUCTS, (data)=>{
        products = [...data]
    }, (err)=>{
        res.send(err);
    });
};

function getProducts(count, onSuccess, onError) {
    let promises = [];
    for (let i = 0; i < count; i++) {
        promises.push( new Promise(resolve => {request(RANDOM_DRINK_URL, {json: true}, (err, res) => {
            if (err) {
                reject(err);
            }          
            const drink = res.body.drinks[0];
            const product = {
                id: drink.idDrink,
                title: drink.strDrink,
                picture: drink.strDrinkThumb,
                description: drink.strInstructions,
                price: getRandomInt(50)
            }
 
            resolve(product);
          })})
          );
      }
    Promise.all(promises).then(results => {onSuccess(results);}).catch(err => onError(err));
}

module.exports = {
    initializeProducts,
    getProductsFromMemory
}
