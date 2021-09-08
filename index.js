const express = require('express')
const cors=require('cors')
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId
require('dotenv').config()

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gqnwo.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority;`
const app = express()
const port =process.env.PORT||3000

app.use(cors())
app.use(express.json())


console.log(process.env.DB_NAME)


// const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gqnwo.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const NewsCollection = client.db("NewPortal").collection("news");
 app.post('/addNews',(req,res)=>{
  console.log(req.body)
  NewsCollection.insertOne(req.body)})

  app.get('/getNews',(req,res)=>{
    NewsCollection.find({})
    .toArray((err,document)=>{
      res.send(document)
    })
  })
  app.get('/newsDetails/:id',(req,res)=>{
    console.log(ObjectId(req.params.id))
    NewsCollection.find({_id:ObjectId(req.params.id)})
    .toArray((err, documents) => {
      res.send(documents[0])
    })
  })

  app.get('/category/:category',(req,res)=>{
    console.log(req.params.category)
    NewsCollection.find({category:(req.params.category)})
   .toArray((err,document)=>{
     res.send(document)
   })
  })

  
  // app.get('/getService',(req,res)=>{
  //   serviceCollection.find({})
  //   .toArray((err,documents)=>{
  //     res.send(documents)
  //   })
  // })

  const topNewsCollection = client.db("NewPortal").collection("topNews");
  app.post('/topNews',(req,res)=>{
    console.log(req.body)
    topNewsCollection.insertOne(req.body)
  })
  
 app.get('/getTopNews',(req,res)=>{
   topNewsCollection.find({})
   .toArray((err,document)=>{
     res.send(document)
   })
 })


 const adminCollection = client.db("NewPortal").collection("adminPannel");
 app.post('/addAdmin',(req,res)=>{
   console.log(req.body)
   adminCollection.insertOne(req.body)
 })


 app.get('/admin',(req,res)=>{
   adminCollection.find({})
   .toArray((err,document)=>{
     res.send(document)
   })
 })

});

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})