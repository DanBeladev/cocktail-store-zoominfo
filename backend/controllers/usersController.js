import request from "request";
import {NUMBER_OF_PRODUCTS, RANDOM_DRINK_URL} from '../common/constants'

// Data Members
let users = ['hello','dan'];

// Functions
exports.getUsers = (req,res) =>{
    if(users.length<=0){
        console.log('empty')
        res.json({users,message: 'No users in system'})
        return;
    }
        res.json(users);
};

exports.createUser = (req, res) =>{
if(!req.params.body){
    res.status('401').send()
}
};

