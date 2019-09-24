const express = require('express');

const app = express();
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

app.listen(port, () => console.log('server started on port ' + port));
