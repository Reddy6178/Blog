import mongoose from 'mongoose';

const PostSchema = mongoose.Schema({
    title:String,
    message:String,
    name:String,
    tags:[String],
    selectedFile:String,
    createdAt:{
        type:Date,
        default: new Date()
    }

})

export default mongoose.model('postMessage',PostSchema)