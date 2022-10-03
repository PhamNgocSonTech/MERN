const Users = require("../models/userModel");

const userCtrl = {
  searchUser: async (req, res) => {
    try {
      const users = await Users.find({
        username: { $regex: req.query.username },
      })
        .limit(10)
        .select("fullname username avatar");
      res.json({ users });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getUser: async (req, res) => {
    try {
      const user = await Users.findById(req.params.id).select("-password")
      .populate("followers followings", "-password")
      if (!user) return res.status(400).json({ msg: "User does not exist" });
      res.json({ user });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  uppdateUser: async (req, res) => {
    
    try {
     
      const { avatar, fullname, mobile, address, story, website, gender } = req.body;
      
      if (!fullname)
        return res.status(400).json({ msg: "Please add your fullname." });

      await Users.findOneAndUpdate(
        { _id: req.user._id },
        { avatar, fullname, mobile, address, story, website, gender }
      );

      res.json({ msg: "Update Success" });

    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  follow: async (req, res) => {
    try {
      const user = await Users.find({_id: req.params.id, followers: req.user._id})
      if(user.length > 0) return res.status(500).json({msg: "You followed this user."})

      const newUser = await Users.findOneAndUpdate({_id: req.params.id}, { 
          $push: {followers: req.user._id}
      }, {new: true}).populate("followers followings", "-password")

      await Users.findOneAndUpdate({_id: req.user._id}, {
          $push: {followings: req.params.id}
      }, {new: true})

      res.json({newUser})

  } catch (err) {
      return res.status(500).json({msg: err.message})
  }
  },

  unfollow: async (req, res) => {
    try {  
      await Users.findOneAndUpdate({_id: req.params.id}, {
        $pull: {followers: req.user._id}
      }, {new: true})

      await Users.findOneAndUpdate({_id: req.user._id}, {
        $pull: {followings: req.params.id}
      }, {new: true})

      res.json({ msg:'UnFollow User'});
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },



};

module.exports = userCtrl;
