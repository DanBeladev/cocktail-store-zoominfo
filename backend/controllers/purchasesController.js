// Data Members
let purchases = [];

// Functions
exports.getPurchases = (req,res) =>{
    if(purchases.length<=0){
        res.json({purchases,message: 'No purchases available'})
        return;
    }
        res.json(purchases);
};

exports.addPurchase = (req, res) =>{
if(req.body && req.body.user && req.body.product){
    const newPurchase = req.body;
    purchases.push(newPurchase);
    res.json(purchases);
}
else{
    res.status('401').json('not valid rquest');
}
};

