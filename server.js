const express = require('express');
const app = express();

const morgan = require('morgan');
const cors = require('cors');

const PORT = process.env.PORT || 3000;

app.get("/", (req, res, next) => {
    console.log("Hello World");
})


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})