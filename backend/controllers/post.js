import { Post } from "../models/Post.js";
import { User } from "../models/User.js";
import mongoose from "mongoose";


// CreatePost
export const createPost = async (req, res) => {
    try {
            console.log("here")
    // const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
    //   folder: "posts",
    // });

    const {public_id,url} = req.body

        const newPostData = {
            caption: req.body.caption,
            image: {
                public_id,
                url,
            },
            owner: req.user._id,
        };

        const post = await Post.create(newPostData);

        const user = await User.findById(req.user._id);

        // save post_created_id in user.posts[] field
        user.posts.push(post._id);
        await user.save();

        res.status(201).json({
            success: true,
            post,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// deletePost
export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        if (post.owner.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized User",
            });
        }

        await post.remove();

        const user = await User.findById(req.user._id);

        const index = user.posts.indexOf(req.params.id);

        user.posts.splice(index, 1);
        await user.save();

        res.status(200).json({
            success: true,
            message: "Post Deleted",
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// Like-Unlike-the-Post
export const likeAndUnlikePost = async (req, res) =>  {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    let found=false;

    post.likes.forEach((item)=>{

        if(item.user==req.user._id.toString()){
            found = true;
        }
    })


    if (found) {
      const index = post.likes.indexOf(req.user._id);

      post.likes.splice(index, 1);

      await post.save();

      return res.status(200).json({
        success: true,
        message: "Post Unliked",
      });
    } else {
      post.likes.push({user:req.user._id});

      await post.save();

      return res.status(200).json({
        success: true,
        message: "Post Liked",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// followUser
export const followUser = async (req, res) => {
    try {
        const userToFollow = await User.findById(req.params.id);
        const loggedInUser = await User.findById(req.user._id);

        if (!userToFollow) {
            return res.status(404).json({
                success: false,
                message:
                    "You cannot follow this user, because it doesn't exists",
            });
        }

        function ismatch(obj) {
            return obj._id.toString() == userToFollow._id.toString();
        }

        const findFollowId = await loggedInUser.following.find(ismatch);

        if (findFollowId != null) {
            const index1 = loggedInUser.following.indexOf(userToFollow._id);
            loggedInUser.following.splice(index1, 1);

            const index2 = userToFollow.followers.indexOf(loggedInUser._id);
            userToFollow.followers.splice(index2, 1);

            await loggedInUser.save();
            await userToFollow.save();

            res.status(200).json({
                success: true,
                message: "Unfollowed",
            });
        } else {
            loggedInUser.following.push(userToFollow._id);
            userToFollow.followers.push(loggedInUser._id);
            await loggedInUser.save();
            await userToFollow.save();

            res.status(200).json({
                success: true,
                message: "Followed successful",
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

export const getPostsOfFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const posts = await Post.find({
      owner: {
        $in: user.following,
      },
    }).populate(["owner", "likes.user", "comments.user"]);

    res.status(200).json({
      success: true,
      posts: posts.reverse(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// updatePost

export const updateCaption = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        if (post.owner.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized ",
            });
        }

        if (!req.body.caption) {
            return res.status(500).json({
                success: true,
                message: "Empty caption not allowed",
            });
        }

        post.caption = req.body.caption;

        await post.save();
        res.status(200).json({
            success: true,
            message: "Caption updated successfully",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// addComment
export const addComment = async (req, res) => {
    try {

        const post = await Post.findById(req.params.id);
        if (!post) {
            res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        let SameCommentExists = false;

        post.comments.forEach((item) => {
            if (req.body.comment_Id) {
                if (item._id.toString() === req.body.comment_Id.toString()) {
                    if (item.user.toString() === req.user._id.toString()) {
                        item.comment = req.body.comment.toString();
                        SameCommentExists = true;
                    }
                }
            }
        });

        if (SameCommentExists) {
            await post.save();
            return res.status(200).json({
                success: true,
                message: "Comment Updated successfully",
            });
        } else {
            // const newCommentId = await post.generateUniqueCommentID()
            post.comments.push({
                user: req.user._id,
                comment: req.body.comment,
                // commentId: newCommentId,
            });
        }

        await post.save();

        res.status(200).json({
            success: true,
            message: "New Comment Added successfully",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

//deleteComment
export const deleteComment = async (req, res) => {
    try {
        console.log('444',req.body)
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(500).json({
                success: false,
                message: "no Post found",
            });
        }

        let commentBySameUser = false;

        if (req.body.comment_Id) {
            post.comments.forEach((item, idx) => {
                if (item._id.toString() === req.body.comment_Id.toString()) {
                    if (item.user.toString() === req.user._id.toString()) {
                        post.comments.splice(idx, 1);
                        commentBySameUser = true;
                    }
                }
            });
        }

        if (commentBySameUser) {
            await post.save();
        } else {
            return res.status(401).json({
                success: false,
                message: "You have no permission to delete this Comment",
            });
        }

        res.status(200).json({
            success: true,
            message: "successfully deleted comment",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
