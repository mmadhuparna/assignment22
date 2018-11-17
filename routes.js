var express = require('express');
var router = express.Router();
const Product = require("./models/Product.js");
const newproducts = require("./productData.js")

//index page
router.get('/', function(req, res){
    Product.find({}, function(err, Product){
        if(err){
            console.log('ERROR: query unsuccessful');
        } else {
            console.log('successfully filtered!');
            res.render('index', {Product: Product});
        }
    })
});

//product form
router.get('/new', function(req, res) {
    res.render('addProduct');
});

//POST the html page to add a new Product
router.post('/new', function(req,res){
    console.log("EDIT POST DATA", req.body);
    const p = {
    
        _id: req.body._id,
        pname: req.body.pname, 
        category: req.body.category, 
        price: req.body.price, 
        quantity:req.body.quantity};

        var productNew = new Product(p)
        productNew.save(function(err){
        if(err){
            console.log('something went wrong');
            res.render('addProduct', {errors: productNew.err})
        } else {
            console.log('successfully added a product!');
            res.redirect('/');
        }
    })
});

//product detail page
router.get('/Product/:id', function(req, res){
    Product.find({_id: req.params.id}, function(err, Product){
        if(err){
            console.log('ERROR: query unsuccessful');
        } else {
            console.log('successfully filtered!');
            res.render('productDetail', {Product: Product[0]});
        }
    })
});

//edit page
router.get('/Product/edit/:id', function(req, res){
    Product.find({_id: req.params.id}, function(err, Product){
        if(err){
            console.log('ERROR: query unsuccessful');
        } else {
            console.log('successfully filtered!');
            res.render('editProduct', {Product: Product[0]});
        }
    })
});

//post updated data to server
router.post('/Product/edit/:id', function(req,res){
    console.log("EDIT POST DATA", req.body);
    var product ={
        _id: req.body._id,
        pname: req.body.pname, 
        category: req.body.category,  
        price: req.body.price, 
        quantity: req.body.quantity}; 
        Product.updateOne({ _id: req.params.id}, {$set: product}, {new: true}, function(err, Product){    
        if(err) {
            console.log('ERROR: edit unsuccessful');
        } else {
            console.log('successfully edited!');
            console.log(Product);
        }
    })
    res.redirect('/Product/'+req.params.id);
});

//delete data
router.post('/Product/delete/:id', function(req, res){
    console.log("initiating delete");
        Product.remove({'_id':req.params.id, 'quantity':0}, function(err){
          if(err)  {
              console.log('Error:something went wrong')
          }
          if('quantity' !== 0) {
            console.log('Product is available, cannot be deleted');
        } else {
            console.log('successfully deleted');
        }
    })
    res.redirect('/');
})

//Insert 5 new records in the Product collection
router.get("/addmore", function(req, resp) {
       Product.insertMany(newproducts, { ordered: false })
      .then(() =>
        resp.send(
          "5 new records added successfully" + '<br><a href="/">Go back</a>'
        )
      )
      .catch(err => console.log(err));
    console.log("5 new rows added successfully");
  });
module.exports = router;