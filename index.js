 const express = require('express');
 const app = express()
 const port = 5000
 const bodyParser = require('body-parser');
 const cors = require('cors');
 const MongoClient = require('mongodb').MongoClient;
 require('dotenv').config()
    
 const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jolmh.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
   

app.use(cors());
app.use(bodyParser.json());
      
app.get('/',(req,res)=>{
  res.send("Hello from db  its working")
})
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  
client.connect(err => {
   const productsCollection = client.db("emaJhonEcommerce").collection("products");
   const ordersCollection = client.db("emaJhonEcommerce").collection("orders");
       
          app.post('/addProducts', (req,res) => {
            const products=req.body;
            console.log(products);
            productsCollection.insertOne(products)
            .then(result => {
              console.log(result.insertedCount);
              res.send(result.insertedCount)
            })
      })
          app.get('/products',(req,res) => {
            const search=req.query.search;
            productsCollection.find({name:{$regex: search}})
            .toArray((err,documents) =>{
              res.send(documents);
            })
          }) 
          //get load product single data
          app.get('/product/:key',(req,res) => {
            productsCollection.find({key: req.params.key})
            .toArray((err,documents) =>{
              res.send(documents[0]);
            })
          }) 
// by specific key
   app.post('/productsByKeys',(req,res)=>{
     const productKeys = req.body;
     productsCollection.find({key: {$in: productKeys}})
     .toArray((err,documents) =>{
       res.send(documents);
     })
   })


   app.post('/addOrder', (req,res) => {
    const order=req.body;
    console.log(order);
    ordersCollection.insertOne(order)
    .then(result => {
      console.log(result.insertedCount);
      res.send(result.insertedCount >0)
    })
})
          });


     app.listen(process.env.PORT || port);