const mongoose = require('mongoose');

const PostSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
        },
        content: {
            type: String,
            required: [true, "Content is required"],
        },
    },
    { timestamps: true}
);

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;