const express = require("express")
const mongoose  =require("mongoose")
const app = express();
const user = require("./models/User.schema");
const Userrouter = require("./Routes/UserRoutes");
const BlogRouter = require("./Routes/BlogRoutes");
const SearchRouter = require("./Routes/SearchRoutes");
const AdminRouter = require("./Routes/AdminRoutes");
app.use(express.json())
const cors = require("cors")
require("dotenv").config()
const upload = require("express-fileupload")
app.use(upload())

app.use("/uploads" , express.static("uploads"))

app.listen(3000)
app.use(cors({
    origin:'*'
}))

app.use("/user" ,  Userrouter)
app.use("/blog" ,  BlogRouter)
app.use("/search" ,  SearchRouter)
app.use("/admin" ,  AdminRouter)
mongoose.connect(process.env.MONGODB_STRING).then(()=>{
    console.log("Connected")
}).catch(err=>{
    console.log(err)
})
