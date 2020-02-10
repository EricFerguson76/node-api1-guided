const express = require('express');

const HUBS = require('./data/hubs-model.js');

const server = express();

server.use(express.json()); // Needed for POST and PUT/PATCH

server.get('/', (req, res) => {
  res.json({ hello: 'Web 26' });
});

// view a list of hubs
server.get('/api/hubs', (req, res) => {
  HUBS.find()
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Oops I did it again' });
    });
});

// add a hub
server.post('/api/hubs', (req, res) => {
  // axios.post(url, data, options); the data will be in body of the request
  const hubInfo = req.body;
  // validate the data, and if the data is valid save it
  HUBS.add(hubInfo)
    .then(hub => {
      res.status(201).json(hub);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: 'oops' });
    });
});

//delete
server.delete('/api/hubs/:id', (req, res) => {
  const { id } = req.params;

  HUBS.remove(id)
    .then(removed => {
      res.status(200).json(removed);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: 'oops' });
    });
});

//put
server.put('/api/hubs/:id', (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  HUBS.update(id, changes)
    .then(change => {
      res.status(200).json(change);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: 'oops' });
    });
});

const port = 5000;

server.listen(port, () => console.log(`/n** API on port ${port} \n`));
