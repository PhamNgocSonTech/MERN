const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
   

}, {
    timestamps: true
})

module.exports = mongoose.model('comment', commentSchema)