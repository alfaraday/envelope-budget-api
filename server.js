const express = require('express');
const app = express();

const morgan = require('morgan');
const cors = require('cors');
const req = require('express/lib/request');

const envelopes = require('./db.js')

const PORT = process.env.PORT || 3000;

app.get("/envelopes", (req, res, next) => {
    res.send(envelopes);
})


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})