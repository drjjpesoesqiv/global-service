const PORT = process.argv[2];

var assert = require('assert');
var redis = require('redis');
var express = require('express');
var cors = require('cors');

var app = express();

app.use(cors('*'));

const redisUrl = (process.argv[3] == 'dev')
  ? '127.0.0.1'
  : 'redis';
var redisClient = redis.createClient(6379, redisUrl);

app.use(express.json());

app.post('/get', (req, res) => {
  try {
    assert.notEqual(req.body.globalKey, undefined);
    redisClient.get(req.body.globalKey, (err, val) => {
      if ( ! val) res.status(404).send();
      else res.status(200).send(val);
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/set', (req, res) => {
  try {
    assert.notEqual(req.body.globalKey, undefined);
    assert.notEqual(req.body.globalVal, undefined);
    redisClient.set(req.body.globalKey, req.body.globalVal, (err) => {
      if ( ! err ) res.status(200).send();
      else res.status(500).send(err);
    });
  } catch(err) {
    res.status(500).send(err);
  }
});

app.listen(PORT, () => {
  console.log(`... listening on port ${PORT}`);
});
