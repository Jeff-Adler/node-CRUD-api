const express = require('express')
const { ObjectID } = require('mongodb')
const Post = require('../models/post')
const router = new express.Router()

//create post
router.post('/posts', async (req, res) => {
    const post = new Post(req.body)

    try {
        await post.save()
        res.status(201).send(post)
    } catch (e) {
        res.status(400).send(e)
    }
})

//read posts
router.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find()
        res.send(posts)
    } catch (e) {
        res.status(500).send() 
    }
})

//read post
router.get('/posts/:id', async (req, res) => {
    try {
        const id = ObjectID.createFromHexString(req.params.id)
        const post = await Post.findById(id)
        if (!post) return res.status(404).send() 

        res.send(post)
    } catch (e) {
        res.status(500).send("Could not retrieve post!") 
    }
})

//update post
router.patch('/posts/:id', async (req, res) => {
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
router.delete('/posts/:id', async (req, res) => { 
    try {
        const id = ObjectID.createFromHexString(req.params.id)
        const post = await Post.findByIdAndDelete(id)
        if (!post) return res.status(404).send()
        res.send(post)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router
