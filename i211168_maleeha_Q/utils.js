const jwt = require("jsonwebtoken")

let AuthenticateUser = async(req , res , next) =>{

    let token = req.headers.token;
    try{
    let DecodedData = await jwt.verify(token , process.env.SECRET_KEY)
    if(DecodedData)
    {
        req.userId = DecodedData.id;
        req.role= DecodedData.role;
        req.FullName= DecodedData.FullName;
        next()
    }else
    {
        res.status(404).json({"Message":"Your Are Not Authenticated"})
    }
}catch(err)
{
    res.status(404).json({"Message":"Your Are Not Authenticated" , err})

}}


module.exports ={
    AuthenticateUser
}

