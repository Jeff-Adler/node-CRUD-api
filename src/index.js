const express = require('express')
const { ObjectID } = require('mongodb')
require('./db/mongoose')
const Post = require('./models/post')

//Set up express server
const app = express()
const port = process.env.PORT || 3000

//Parse incoming JSON requests
app.use(express.json())

//create post
app.post('/posts', async (req, res) => {
    const post = new Post(req.body)

    try {
        await post.save()
        res.status(201).send(post)
    } catch (e) {
        res.status(400).send(e)
    }
})

//read posts
app.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find()
        res.send(posts)
    } catch (e) {
        res.status(500).send() 
    }
})

//read post
app.get('/posts/:id', async (req, res) => {
    const _id = req.params.id 
    const id = ObjectID.createFromHexString(_id)
    
    try {
        const post = await Post.findById(id)
        if (!post) return res.status(404).send() 

        res.send(post)
    } catch (e) {
        res.status(500).send(id) 
    }
})


//update post

//delete post

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
