const express = require('express')
const app = express()
const port = 3000

const ejs = require('ejs');
const people = ['geddy', 'neil', 'alex'];
const html = ejs.render('<%= people.join(", "); %>', {people: people});

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index", {title: "Home"});
});

app.post('/', (req, res) => {
    res.send('Got a POST request')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
