const express = require('express');
const app = express();

const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const envelopes = require('./db.js')

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const getNextId = () => {
    const id = envelopes[envelopes.length - 1].id + 1;
    return id;
}

app.param('envelopeId', (req, res, next, id) => {
    const envelope = envelopes.find(item => item.id == id)
    if (envelope) {
        req.envelope = envelope;
        req.id = id;
        req.index = envelopes.findIndex(item => item.id == req.id);
        next();
    } else {
        res.status(404).send('Invalid envelope');
    }
})

app.get('/envelopes', (req, res, next) => {
    res.send(envelopes);
});

app.post('/envelopes', (req, res, next) => {
    const category = req.body.category;
    const limit = Number(req.body.limit);
    if (
        category &&
        typeof category == "string" &&
        limit > 0
    ) {
        const newEnvelope = {
            id: getNextId(),
            category: category,
            limit: limit,
            balance: limit
        };
        envelopes.push(newEnvelope);
        res.status(201).send(newEnvelope);
    } else {
        res.status(404).send('Invalid envelope');
    }
});

app.get('/envelopes/:envelopeId', (req, res, next) => {
    res.send(req.envelope);
})

app.put('/envelopes/:envelopeId', (req, res, next) => {
    const category = req.body.category;
    const limit = Number(req.body.limit);
    const balance = Number(req.body.balance);
    if (
        category &&
        typeof category == "string" &&
        limit > 0 &&
        (balance || balance === 0)
    ) {
        const newEnvelope = {
            id: req.id,
            category: category,
            limit: limit,
            balance: balance
        };
        envelopes[req.index] = newEnvelope;
        res.send(newEnvelope);
    } else {
        res.status(400).send('Invalid request');
    }
})

app.delete('/envelopes/:envelopeId', (req, res, next) => {
    envelopes.splice(req.index, 1);
    res.status(204).send();
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})