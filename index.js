// middleware
import express from "express";
import bodyParser from "body-parser";

// initialize program
const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// create posts array
const posts = [];

// route for homepage
app.get("/", (req, res) => {
    res.render("index.ejs", { posts });
  });

// route for new post
app.post('/create', (req,res) => {
    // get data from form submission
    const { pet, breed, content } = req.body;

    // get time of submission
    const timeCreated = new Date().toLocaleString();

    // create new post object
    const newPost = {
        pet,
        breed,
        content,
        timeCreated,
    };

    // push onto array
    posts.push(newPost);

    // redirect to homepage
    res.redirect('/');
})

// route for deleting a post
app.post('/delete-post/:index', (req,res) => {
    // get index of post to be deleted
    const postIndex = req.params.index;

    // remove post at specified index
    posts.splice(postIndex, 1);

    // redirect to homepage
    res.redirect('/');
});

// route for editing a post
app.get('/edit/:index', (req, res) => {
    // index of post to be edited
    const postIndex = req.params.index;
    const post = posts[postIndex];

    // check if post exists
    if( post ) {
        // render edit.ejs with post and index
        res.render('edit', { post, index: postIndex });
    } else {
        // return post not found
        res.status(404).send('Post not found');
    }
});

// route for editing a post
app.post('/edit/:index', (req, res) => {
    // index of post to be edited
    const postIndex = req.params.index;
    
    // get data from form submission
    const { pet, breed, content } = req.body;

    // update the post with new values
    if( posts[postIndex]) {
        posts[postIndex] = {
            pet,
            breed,
            content,
            createdAt: posts[postIndex].createdAt, 
        };
    };

    // redirect to homepage
    res.redirect('/');
});


// start server and listen at port 3000
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });