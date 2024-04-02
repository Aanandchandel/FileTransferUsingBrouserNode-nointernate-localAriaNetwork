let {password,key}=require("../server")

const loginMiddleware=(req,res,next)=>{
 if (password==key){
    next()
 }

}
module.exports={loginMiddleware};