const express =require("express")
const router= express.Router()
const {loginMiddleware }=require("../Middleware/middleware")
router.use(loginMiddleware);

router.post("/home",(req,res)=>{
    res.render("index",{title:"File"})
})

module.exports=router
