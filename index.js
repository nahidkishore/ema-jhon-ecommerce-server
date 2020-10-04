 const express = require('express');
 const bodyParser = require('body-parser');
 const cors = require('cors');
 const MongoClient = require('mongodb').MongoClient;
 require('dotenv').config()
    
 const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jolmh.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
   
 const app = express()
 const port = 5000

 app.use(bodyParser.json());
 app.use(cors());
          
  const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });
       client.connect(err => {
          const products = client.db("emaJhonStore").collection("products");
       
          app.post('/AddProducts',(req,res) => {
            const product=req.body;
            products.insertOne(product)
            .then(result => {
              console.log(result);
            })
          })
          });


          app.listen(port)