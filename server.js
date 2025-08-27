const express = require('express');
const connectDB = require('./database');
const Post = require('./post.model')
const app = express();

//resource
const PORT = 3000

//middleware
app.use(express.json());

// Get all posts
app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Get a single post by ID
app.get('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: 'Invalid post ID' });
  }
});

// Create a new post
app.post('/posts', async (req, res) => {
  try {
    const { title, content } = req.body;
    const newPost = new Post({ title, content });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a post by ID
app.put('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const { title, content } = req.body;
    if (title !== undefined) post.title = title;
    if (content !== undefined) post.content = content;

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: 'Invalid post ID or data' });
  }
});

// Delete a post by ID
app.delete('/posts/:id', async (req, res) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Post not found' });
    res.json({ message: 'Post deleted' });
  } catch (error) {
    res.status(400).json({ error: 'Invalid post ID' });
  }
});

(async () => {
    try {
        await connectDB();

        app.listen(PORT, ()=> {
            console.log(`your server is running: http://localhost:${PORT}`);
        })
    }
    catch (error) {
        console.error(`Failed to connect to DB: ${error}`);
    }
})();