import request from "request";

const RANDOM_DRINK_URL ='https://www.thecocktaildb.com/api/json/v1/1/random.php';

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

function getProducts(count, onSuccess, onError) {
    let promises = [];
    for (let i = 0; i < count; i++) {
        promises.push( new Promise(resolve => {request(RANDOM_DRINK_URL, {json: true}, (err, res) => {
            if (err) {
              return reject(err);
            }          
            const drink = res.body.drinks[0];
            const product = {
                id: drink.idDrink,
                title: drink.strDrink,
                picture: drink.strDrinkThumb,
                description: drink.strInstructions,
                price: getRandomInt(50) + '$'
            }
 
            resolve(product);
          })})
          );
      }
    Promise.all(promises).then(results => {onSuccess(results);}).catch(err => onError(err));
}

exports.getRandomProducts = (req, res) => {
    getProducts(20, (data)=>{
        res.json(data);
    }, (err)=>{
        res.send(err);
    });
};