 const express = require('express')
 const MongoClient = require('mongodb').MongoClient;
 require('dotenv').config()
    
 const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jolmh.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
   const app = express()
   const port = 5000

          
  const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });
       client.connect(err => {
          const products = client.db("emaJhonStore").collection("products");
         console.log('database connected');
          });


          app.listen(port)