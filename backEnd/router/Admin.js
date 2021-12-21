const express=require("express");
const router= express.Router();
const User=require("../DB/models/userSchema")

require("../DB/moongose");

router.get("/adminlogin", (req,res)=>{
    
            res.send("hello from admin login");
         
           
})

router.post('/adminlogin',async(req,res)=>{
    try{
        const{email,password}=req.body;
        if(!email || !password){
            return res.status(422).json({error:"fill all the fields"})
        }

        const adminLogin=await User.findOne({email})
        if(adminLogin){
            return res.status(201).json({msg:"login successfull"})
        }else{
            return res.status(201).json({err:"INVALID CREDENTIALS"})
        }
    }catch(err){
        console.log(err)
    }
})


module.exports = router;