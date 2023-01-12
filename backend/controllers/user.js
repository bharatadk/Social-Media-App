import { User } from "../models/User.js";
import { Post } from "../models/Post.js";
import { sendEmail } from "../middlewares/sendEmail.js";
import crypto from "crypto";

// REGISTER
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exists with this Email ",
            });
        }

        user = await User.create({
            name,
            email,
            password,
            avatar: {
                public_id: "sample_id",
                url: "sample_url",
            },
        });

        const token = await user.generateToken();

        const tokenConfig = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };

        res.status(201).cookie("token", token, tokenConfig).json({
            success: true,
            user,
            token,
            message: "User Created Successfully",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// LOGIN
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password").populate(["posts","followers","following"]);


        if (!user) {

            return res.status(400).json({
                success: false,
                message: "User does not exists",
            });
        }


        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect password",
            });
        }

        const token = await user.generateToken();

        const tokenConfig = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };


        res.status(200).cookie("token", token, tokenConfig).json({
            success: true,
            user,
            token,
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error in Login",
        });
    }
};

// LOGOUT
export const logout = async (req, res) => {
    try {
        res.status(200)
            .cookie("token", null, {
                expires: new Date(Date.now()),
                httpOnly: true,
            })
            .json({
                success: true,
                message: "Logged Out",
            });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

export const updatePassword = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("+password");

        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Please provide both Old Password and New Password",
            });
        }

        const isMatch = await user.matchPassword(oldPassword);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect Old Password",
            });
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password Successfully Updated",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        const { name, email } = req.body;

        if (name) {
            user.name = name;
        }

        if (email) {
            user.email = email;
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: "Profile Updated",
            user,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

export const deleteMyProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        const posts = user.posts;

        //cascade delete all posts of user from PostDocument
        for (let i = 0; i < posts.length; i++) {
            const post = await Post.findById(posts[i]);
            await post.remove();
        }

        const followers = user.followers;

        for (let i = 0; i < followers.length; i++) {
            const eachFollower = await User.findById(followers[i]);
            const indexFollowing = eachFollower.following.indexOf(req.user._id);
            const indexFollowers = eachFollower.followers.indexOf(req.user._id);

            eachFollower.following.splice(indexFollowing, 1);
            eachFollower.followers.splice(indexFollowers, 1);

            await eachFollower.save();
        }

        await user.remove();

        // // Now logout to avoid Errors
        res.cookes("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        });

        res.status(200).json({
            success: true,
            message: "Profile Deleted Successfully",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// myProfile
export const myProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate(["posts","followers","following"]);

        if (!user) {
            res.status(200).json({
                success: true,
                message: "No user found with that ID",
            });
        }

        res.status(200).json({
            success: true,
            user,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// getUserProfile
export const userProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate(["posts","followers","following"]);

        res.status(200).json({
            success: true,
            user,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// getAllUsers
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});

        res.status(200).json({
            success: true,
            users,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

//forgotPassword

export const forgotPassword = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "This user doesn't exists",
            });
        }
        const resetToken = user.getResetPasswordToken();

        await user.save();

        const resetUrl = `${req.protocol}://${req.get(
            "host"
        )}/api/v1/password/reset/${resetToken}`;

        const message = `Reset Your Password by clicking in the link below:\n\n ${resetUrl}`;

        try {
            await sendEmail({
                email: user.email,
                subject: "Reset Password",
                message,
            });

            return res.status(200).json({
                success: true,
                message: `Email sent to ${user.email}`,
            });
        } catch (err) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// resetPassword
export const resetPassword = async (req, res) => {
    try {
        const resetPasswordToken = crypto
            .createHash("sha256")
            .update(req.params.token)
            .digest("hex");

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Token is Invalid / has expiredt ",
            });
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password Reset Successfully",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

export const getMyPosts = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const posts = [];

    for (let i = 0; i < user.posts.length; i++) {
      const post = await Post.findById(user.posts[i]).populate(
        "likes comments.user owner"
      );
      posts.push(post);
    }

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};