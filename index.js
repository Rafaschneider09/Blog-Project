import express from "express";
import bodyparser from "body-parser";

const app = express();
const port = 3000;
let posts = [];



app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", (req, res) => {
    res.render("index", {posts: posts});
});

app.post("/submit", (req, res) => {
    const newPost = {title: req.body.postTitle, content: req.body.postBody };
    console.log(req.body);
    posts.push(newPost);
    res.redirect("/")
});


app.post("/delete", (req, res) => {
    posts.splice(Number(req.body.deleteBtn), 1);
    res.redirect("/")
});

app.get("/edit", (req, res) => {
    
    const postIndex = req.query.index;
    const postToEdit = posts[postIndex];
    console.log(postIndex);
    res.render("edit.ejs", {postToEdit, postIndex});
});

app.post("/save" , (req, res) => {
    const newPost = {title: req.body.postTitle, content: req.body.postBody };
    posts[Number(req.body.postIndex)] = newPost;
    res.redirect("/");
});

app.listen(port, () => {
    console.log("Server running on port " + `${port}`)
});