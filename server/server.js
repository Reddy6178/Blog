import dotenv from 'dotenv'
import app from './index.js';
import mongoose from 'mongoose';

dotenv.config()

const port = 3001
mongoose.connect(process.env.CONNECTION_STRING,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>app.listen(port,()=>console.log(`Server running on port: ${port}`)) )
    .catch((error)=>console.log(error))