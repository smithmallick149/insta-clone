const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin')
const Post = mongoose.model("Post")



//create routes

//get all posts
router.get('/allpost', requireLogin, (req, res) => {
  Post.find()
    .populate("postedBy", "_id name")
    .populate("comments.postedBy", "_id name")
    .sort('-createdAt')
    .then((posts) => {
      res.json({ posts })
    }).catch(err => {
      console.log(err)
    })

})
//creating post route
router.post('/createpost', requireLogin, (req, res) => {
  const { title, body } = req.body
  if (!title || !body) {
    return res.status(422).json({ error: "please add all the fields" })
  }
  req.user.password = undefined

  const post = new Post({
    title,
    body,
    // photo: pic,
    postedBy: req.user
  })
  console.log(req.user)
  post.save().then(result => {
    res.json({ post: result })
  })
    .catch(err => {
      console.log(err)
    })
})

//get my post - with respect to id
router.get('/mypost', requireLogin, (req, res) => {
  console.log(req.user.name)
  Post.find({ postedBy: req.user._id })
    .populate("PostedBy", "_id name")
    .then(mypost => {
      res.json({ mypost })
    })
    .catch(err => {
      console.log(err)
    })
})

module.exports = router

