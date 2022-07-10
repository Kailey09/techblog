const router = require('express').Router();
const {
    User,
    Post,
    Comment
} = require('../models');

// get all post
router.get('/', (req, res) => {
    Post.findAll({
        attributes: ["id", "content", "title", "created_at"],
        order: [
            ["created_at", "DESC"]
        ],
        include: [{
            model: User,
            attributes: ["username"],
        },
        {
            model: Comment,
            attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
            include: {
                model: User,
                attributes: ["username"],
            },
        },
    ],
    })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});