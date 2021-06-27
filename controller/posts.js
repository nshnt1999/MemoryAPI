const { Mongoose } = require('mongoose')
const PostMessage = require('../model/postMessages.js')


exports.getPosts = async (req,res)=>{
    try{
        const postMessages  = await PostMessage.find()
        res.status(200).json(postMessages)
    }catch(error){
        res.status(404).json({message:error.message})
    }
    
}

exports.createPost = async (req,res)=>{
    const post = req.body
    // console.log(post.tags.split(','));
    post.tags = post.tags.split(',')
    console.log(post);
    const newPost = new PostMessage(post)
    try{
        await newPost.save()
        res.status(201).json(newPost)
    }catch(error){
        res.status(409).json({message:error.message})
    }
}

exports.updatePost = async (req,res)=>{
    const {id} = req.params
    // console.log(id);
    const post = req.body
    console.log(post);
    const doesUserExit = await PostMessage.exists({ _id: id });
    if(!doesUserExit)   return res.status(404).send("This id is not in database")
    const updatePost = await PostMessage.findByIdAndUpdate(id,{...post,_id:id},{new:true})
    res.json(updatePost)
}


exports.deletePost = async (req,res)=>{
    const {id} = req.params
    
    const doesUserExit = await PostMessage.exists({ _id: id });
    if(!doesUserExit)   return res.status(404).send("This id is not in database")
    const response = await PostMessage.findByIdAndDelete(id)
    res.json({message:"The Post is Successfully deleted!"})
}

exports.likeUpdate = async (req,res)=>{
    const {id} = req.params 
    // console.log(id);
    const doesUserExit = await PostMessage.exists({ _id: id });
    if(!doesUserExit)   return res.status(404).send("This id is not in database")
    const post = await PostMessage.findById(id) 
    const updatePost = await PostMessage.findByIdAndUpdate(id,{likeCount:post.likeCount+1},{new:true})
    res.json(updatePost)
    
   
}