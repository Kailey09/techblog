const router = require('express').Router();
const {
    User,
    Post,
    Comment
} = require('../models');


// get all comments
router.get("/", (req, res) => {
    Comment.findAll()
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

// create a comment
router.post('/', (req, res) => {
    if(req.sessionn) {
        Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        })
        .then(dbCommentData => res.json (dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }
});

module.exports = router;