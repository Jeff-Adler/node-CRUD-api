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
    
    try {
        const id = ObjectID.createFromHexString(_id)
        const post = await Post.findById(id)
        if (!post) return res.status(404).send() 

        res.send(post)
    } catch (e) {
        res.status(500).send("Could not retrieve post!") 
    }
})

//update post
app.patch('/posts/:id', async (req, res) => {
    // gets all fields to be updated in body of request
    const updates = Object.keys(req.body)

    // all fields that are permitted to be updated
    const allowedUpdates = ['text'] 
    
    // checks that every field that user requests to update is allowed to be updated
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    // returns error if user tries to update invalid field
    if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' })

    try {
        const id = ObjectID.createFromHexString(req.params.id)
        const post = await Post.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
        if (!post) return res.status(404).send()
        res.send(post)
    } catch (e) {
        res.status(400).send(e) 
    }
})

//delete post

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
