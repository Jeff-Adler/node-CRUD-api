const express = require('express')
require('./db/mongoose')

//Post routes
const postRouter = require('./routers/post')

//Set up express server
const app = express()
const port = process.env.PORT || 3000

//Parse incoming JSON requests
app.use(express.json())

//accept Post routes
app.use(postRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
