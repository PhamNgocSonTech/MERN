const Users = require("../models/userModel")
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    try{
        const token = req.header("Authorization")
        if(!token) return res.status(400).json({msg: "Invalid Authorization"});
        
        // Decode ra lấy id để kiểm tra người gửi là ai
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        if(!decoded) return res.status(400).json({msg: "Invalid Authorization"});
        
        const user = await Users.findOne({_id: decoded.id })
        
        req.user = user
        next()

    }catch(err) {
        return res.status(500).json({msg: err.message});
    }
}

module.exports = auth