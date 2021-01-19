require('./mongoose')
const faker = require('faker');

const Post = require('../models/post')

const times = (repetitions, callback) => {
    while (repetitions > 0) {
        callback()
        repetitions--
    }
  }

times(20 , async () => {
    const post = new Post({
        text: faker.lorem.sentence()
    })
    try {
        await post.save()
        console.log(post)
    } catch (e) {
        console.log("Could not save Post seed. ", e)
    }
})
