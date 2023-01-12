import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    caption: String,

    image: {
        public_id: String,
        url: String,
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

    likes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        },
    ],

    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            comment: {
                type: String,
                required: true,
            },
        },
    ],
});

postSchema.methods.generateUniqueCommentID = async function () {
    const dateString = Date.now().toString(36);
    const randomness = Math.random().toString(36).substr(2);
    return (dateString + randomness).toString();
};

const Post = mongoose.model("Post", postSchema);
export { Post };
