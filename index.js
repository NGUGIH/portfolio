import bodyParser from "body-parser";
import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.set('view engine', 'ejs');

app.use(express.static( path.join(__dirname("public")))

let blogPosts = [
    {id:1, title:"What is Lorem Ipsum?", content:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}
]

app.listen(port, ()=>{
    console.log(`Listening to server port ${port}`)
})


app.get("/", (req, res)=>{
    res.render("index.ejs")
})
app.get("/about", (req, res)=>{
    res.render("about.ejs")
})
app.get("/contact", (req, res)=>{
    res.render("contact.ejs")
})

app.get("/projects", (req, res)=>{
    res.render("projects.ejs")
})

app.get("/resume", (req, res)=>{
    res.render("resume.ejs")
})

app.get("/blog", (req, res)=>{
    res.render("blog.ejs", {blogPosts})
})

app.get("/new", (req, res)=>{
    res.render("new.ejs")
})

app.post("/new", (req, res)=>{
    const {title, content } = req.body
    const newPost = {id:blogPosts.length+1, title, content}
    blogPosts.push(newPost)
    res.redirect("/blog")
}

)

app.get("/edit/:id", (req,res)=>{
    const id = parseInt(req.params.id)
    const post = blogPosts.find(post=>post.id === id)
    res.render("edit", {post})
})


app.post("/edit/:id", (req,res)=>{
    const id = parseInt(req.params.id)
    const {title, content } = req.body
    const postIndex = blogPosts.findIndex(post=>post.id === id)
    blogPosts[postIndex] = {id, title, content}
    res.redirect("/blog")
})

app.post('/delete/:id', (req, res) => {
  const id = parseInt(req.params.id);
  blogPosts = blogPosts.filter(post => post.id !== id);
  res.redirect('/');
});
