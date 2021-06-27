const express = require('express')
const router  = express.Router()
const {getPosts,createPost,updatePost,deletePost,likeUpdate} = require('../controller/posts.js')



router.get('/',getPosts)

router.post('/',createPost)

router.patch('/:id',updatePost)

router.delete('/:id',deletePost)

router.patch('/:id/likePost',likeUpdate)

module.exports = router
