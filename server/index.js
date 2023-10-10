import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import Routes from './routes/posts.js'

const app = express()
app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use(cors())
app.use('/posts',Routes)

export default app;



