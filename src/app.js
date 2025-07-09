const express = require('express')
const app = express()
const port = 3000

const ejs = require('ejs');
const people = ['geddy', 'neil', 'alex'];
const html = ejs.render('<%= people.join(", "); %>', {people: people});

const fs = require('fs');
const path = require('path');

// cache this somehow. idk how javascript works
var posts = []

app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("base", {content: "./partials/index-content.ejs", title: ""});
});

app.post('/', (req, res) => {
    res.send('Got a POST request')
})

app.get('/blog', (req, res) => {
    posts = get_posts()
    res.render("base", {content: "./partials/blog-content.ejs", title: "blog", posts: posts});
})

app.get("/blog/:post_name", (req, res) => {
  res.render("base", {content: `./blog-posts/${post_name}`, title: post_name})
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// so i think im just going to store posts in views/blog-posts/ 
// and this function just read every file in that directory

// also there's no post edit/create client. they're just going to be partial html files lol

function get_posts(){

  posts = fs.readdirSync('./views/blog-posts', (err, files) => {
    if (err) {
      console.error(err);
      return []
    }
    else{
      console.log('found posts:');
      console.log(files);

      return files
    }
  });

  return posts
}

// this is just here to remind me that there probably is a better way to store posts 
// class post {

// }