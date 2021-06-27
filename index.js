const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors =    require('cors')
const postRoutes = require('./routes/post.js')
const dotenv = require('dotenv')
// const CONNECTION_URL = "mongodb+srv://nshnt1999:nshnt1999@cluster0.l0mnj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" 
const PORT = process.env.PORT||5000


const app = express()
dotenv.config()

app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use(cors())
app.use('/posts',postRoutes)

app.get('/',(req,res)=>{
    res.send("Welcome to memories api")
})



mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>app.listen(PORT,()=>console.log(`Server running on: ${PORT}`)))
    .catch((error)=>console.log(error.message))


mongoose.set('useFindAndModify',false)