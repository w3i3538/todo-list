const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    isDone: {
        type: Boolean,
        default: false  // 預設完成狀態為 false
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref:'User',
        index:true,
        require:true
    }
})

module.exports = mongoose.model('Todo', todoSchema)