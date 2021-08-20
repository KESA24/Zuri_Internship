const express = require('express');

const bodyParser= require('body-parser');

const app = express();

const port = process.env.PORT || 5000


const MongoClient = require('mongodb').MongoClient

const mongodb_connection_string = 'mongodb+srv://kesa_26:tKSnC1kAtbKcGj48@resumepage.9dugr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

MongoClient.connect(mongodb_connection_string , { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')

    const db = client.db('client-messages')

    const clientRequestsCollection = db.collection('clientRequests')

    app.listen(port, function() {
        console.log('listening on 5000')
      })
    
    app.use(bodyParser.urlencoded({ extended: true }))
    
      app.use(express.static('public'))

      app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html')
      })
    
      app.post('/clients', (req, res) => {
        clientRequestsCollection.insertOne(req.body)
        .then(result => {
            res.redirect('/')
          })
          .catch(error => console.error(error))
      })
  })
  .catch(error => console.error(error))


  

  