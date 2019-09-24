const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const port = process.env.PORT || 3000;

const { Client } = require('pg')
const client = new Client()
client.connect()

/**
 * This is a super-smart method that works with arrays or single
 * results, and autoformats our responses in a consistent fashion.
 *
 * Oh so smart!
 */
const convertDbResultToResponse = (dbResult) => {
  const response = Array.isArray(dbResult)
    ? dbResult.map(result => result.rows)
    : [dbResult.rows]
  
  return {
    now: Date.now(),
    response,
  };
}

app.get('/comments', (req, res) => {
  if (req.query.userId) {
    client.query('SELECT * from comments where user_id = \'' + req.query.userId + '\';', [], (err, dbResult) => {
      if (err) {
        res.status(500).send();
        return;
      }
      res.json(convertDbResultToResponse(dbResult));
    })
  } else {
    client.query('SELECT * from comments', (err, dbResult) => {
      if (err) {
        res.status(500).send();
        return;
      }
      res.json(convertDbResultToResponse(dbResult));
    })
  }
});

app.post('/comments', (req, res) => {
  if (!req.body || !req.body.userId || !req.body.comment) {
    res.status(400).send();
    return;
  }
  console.log(req.body);
  client.query('INSERT INTO comments (comment, user_id) values (\'' + req.body.comment + '\', \'' + req.body.userId + '\');', [], (err, dbResult) => {
    if (err) {
      console.log(err);
      res.status(500).send();
      return;
    }
    res.status(200).send();
  });
})

app.listen(port, () => console.log('server started on port ' + port));
