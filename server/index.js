console.log("Test Node Server");

const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('frontend'));
app.use(express.json());


const messages = [];

app.get('/api/messages', (req, res) => {
    res.json(messages);
})

app.post('/api/messages', (req, res) => {
    console.log(req);
    messages.push(req.body);
    res.status(201).end();
})
  
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})
