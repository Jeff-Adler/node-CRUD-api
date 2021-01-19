const express = require('express')
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
        res.status(400).send()
    }

    res.status(200).send()
})

//read posts

//read posts

//update post

//delete post

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
