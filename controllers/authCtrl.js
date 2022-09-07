const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const axios = require("axios");
const querystring = require("querystring");

const authCtrl = {
    register: async (req, res) => {
        try {
            const { fullname, username, email, password, gender } = req.body
            let newUserName = username.toLowerCase().replace(/ /g, '')

            const user_name = await Users.findOne({username: newUserName})
            if(user_name) return res.status(400).json({msg: "This user name already exists."})

            const user_email = await Users.findOne({email})
            if(user_email) return res.status(400).json({msg: "This email already exists."})

            if(password.length < 6)
            return res.status(400).json({msg: "Password must be at least 6 characters."})

            const passwordHash = await bcrypt.hash(password, 12)

            const newUser = new Users({
                fullname, username: newUserName, email, password: passwordHash, gender
            })


            const access_token = createAccessToken({id: newUser._id})
            const refresh_token = createRefreshToken({id: newUser._id})

            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/api/refresh_token',
                maxAge: 30*24*60*60*1000 // 30days
            })

            await newUser.save()

            res.json({
                msg: 'Register Success!',
                access_token,
                user: {
                    ...newUser._doc,
                    password: ''
                }
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body

            const user = await Users.findOne({email})
            .populate("followers followings", "avatar username fullname followers followings")

            if(!user) return res.status(400).json({msg: "This email does not exist."})

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})

            const access_token = createAccessToken({id: user._id})
            const refresh_token = createRefreshToken({id: user._id})

            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/api/refresh_token',
                maxAge: 30*24*60*60*1000 // 30days
            })

            res.json({
                msg: 'Login Success!',
                access_token,
                user: {
                    ...user._doc,
                    password: ''
                }
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    googleLogin: async (req, res) => {
        try {
          const { email, name } = req.body;
          console.log(email);
          // res.status(200).json({ msg: "ok" });
    
          const user = await Users.findOne({ email }).populate(
            "followers followings",
            "avatar username fullname followers followings"
          );
    
          if (!user) {
            const newUser = new Users({
              fullname: name,
              username: name,
              email: email,
              password: "12345678",
            });
            await newUser.save();
    
            const access_token = createAccessToken({ id: newUser._id });
            const refresh_token = createRefreshToken({ id: newUser._id });
            res.cookie("refreshtoken", refresh_token, {
              httpOnly: true,
              path: "/api/refresh_token",
              maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
            });
    
            res.json({
              msg: "Login Success!",
              access_token,
              user: {
                ...newUser._doc,
                password: "",
              },
            });
          } else {
            const access_token = createAccessToken({ id: user._id });
            const refresh_token = createRefreshToken({ id: user._id });
    
            res.cookie("refreshtoken", refresh_token, {
              httpOnly: true,
              path: "/api/refresh_token",
              maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
            });
    
            res.json({
              msg: "Login Success!",
              access_token,
              user: {
                ...user._doc,
                password: "",
              },
            });
          }
    
          // const isMatch = await bcrypt.compare(password, user.password);
          // if (!isMatch)
          //   return res.status(400).json({ msg: "Password is incorrect." });
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
      },

    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', {path: '/api/refresh_token'})
            res.clearCookie("jwt-cookie");
            return res.json({msg: "Logged out!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    generateAccessToken: async (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken
            if(!rf_token) return res.status(400).json({msg: "Please login now."})

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, async(err, result) => {
                if(err) return res.status(400).json({msg: "Please login now."})

                const user = await Users.findById(result.id).select("-password")
                .populate('followers followings', 'avatar username fullname followers followings')

                if(!user) return res.status(400).json({msg: "This does not exist."})

                const access_token = createAccessToken({id: result.id})

                res.json({
                    access_token,
                    user
                })
            })
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    gitHubLogin: async (req, res, next) => {
      try {
        const code = req.query.code;
        const path = req.query.path;
        console.log(code);
        console.log(path);
        if (!code) {
          throw new Error("No Code");
        }
        const githubUser = await getGitUser(code);
  
        const { id, login, name } = githubUser;
        // res.status(200).json({ msg: "ok" });
        const user = await Users.findOne({ gitId: id }).populate(
          "followers followings",
          "avatar username fullname followers followings"
        );
        if (!user) {
          const newUser = new Users({
            fullname: name,
            email: "son@gmail.com",
            username: login,
            password: "123456",
            gitId: id,
          });
          await newUser.save();
  
          const access_token = createAccessToken({ id: newUser._id });
          const refresh_token = createRefreshToken({ id: newUser._id });
          res.cookie("refreshtoken", refresh_token, {
            httpOnly: true,
            path: "/api/refresh_token",
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
          });
  
          res.json({
            msg: "Login Success!",
            access_token,
            user: {
              ...newUser._doc,
              password: "",
            },
          });
          console.log("ok1");
        } else {
          const access_token = createAccessToken({ id: user._id });
          const refresh_token = createRefreshToken({ id: user._id });
  
          res.cookie("refreshtoken", refresh_token, {
            httpOnly: true,
            path: "/api/refresh_token",
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
          });
          res.cookie("jwt-cookie", access_token, {
            httpOnly: true,
            domain: "localhost",
          });
          // res.json({
          //   msg: "Login Success!",
          //   access_token,
          //   user: {
          //     ...user._doc,
          //     password: "",
          //   },
          // });
          res.redirect(`http://localhost:3000${path}`);
          console.log("Success");
        }
        // console.log("git hub user", githubUser);
        // res.redirect(path);
      } catch (err) {
        return res.status(500).json({ msg: err.message });
      }
    },
    // git: async (req, res) => {
    //   console.log(req.user)
    //   next()
    // }
    me: async (req, res) => {
      try {
        const cookie = req.cookies["jwt-cookie"];
        // const cookie = get(req.cookies["jwt-cookie"]);
        const decode = jwt.verify(
          cookie,
          process.env.ACCESS_TOKEN_SECRET,
          async (err, result) => {
            if (err) return res.status(400).json({ msg: "Please login now." });
  
            const user = await Users.findById(result.id)
              .select("-password")
              .populate(
                "followers followings",
                "avatar username fullname followers followings"
              );
  
            if (!user)
              return res.status(400).json({ msg: "This does not exist." });
  
            const access_token = createAccessToken({ id: result.id });
  
            res.json({
              access_token,
              user,
            });
          }
        );
      } catch (e) {
        console.log(e);
        return res.send(null);
      }
    },
  };
  
  const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1d",
    });
  };
  
  const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "30d",
    });
  };
  const getGitUser = async (code) => {
    const githubToken = await axios
      .post(
        `https://github.com/login/oauth/access_token?client_id=c1a9b1615a6dacb34f42&client_secret=4a1d2345f8480e0f1c1a7d5fba082434a9d8282d&code=${code}`
      )
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
    console.log(code);
    console.log("githubtoken", githubToken);
    const decode = querystring.parse(githubToken);
    console.log(decode);
    const access_token = decode.access_token;
    console.log(access_token);
    return axios
      .get("https://api.github.com/user", {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((res) => res.data)
      .catch((error) => {
        console.log(" git hub errorƒ");
        throw error;
      });
};





module.exports = authCtrl