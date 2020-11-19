const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpire } = require("../config/keys");

exports.signupController = async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({
        errorMessage: "E-mail already exists!",
      });
    }
    const newUser = new User();
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.username = username;
    newUser.email = email;
    const salt = await bcryptjs.genSalt();
    newUser.password = await bcryptjs.hash(password, salt);
    await newUser.save();
    res.status(200).json({
      successMessage: "Registration success, Please signin !",
    });
  } catch (err) {
    console.log("signupController error: ", err);
    res.status(500).json({
      successMessage: "Server error !",
    });
  }
};

exports.signinController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        errorMessage: "Invalid credentials!",
      });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        errorMessage: "Invalid credentials!",
      });
    }
    const payload = {
      user: {
        _id: user._id,
      },
    };
    jwt.sign(payload, jwtSecret, { expiresIn: jwtExpire }, (err, token) => {
      if (err) {
        console.log("jwt error:", err);
      }
      const { _id, username, email, role } = user;
      res.json({
        token,
        user: { _id, username, email, role },
      });
    });
  } catch (err) {
    console.log("signupController error: ", err);
    res.status(500).json({
      errorMessage: "Server error!",
    });
  }
};

// exports.updateController = async(req,res) => {
//     const userId = req.params.id;
//     const user = await User.findById(userId);
//     if (user) {
//       user.name = req.body.name || user.name;
//       user.email = req.body.email || user.email;
//       user.password = req.body.password || user.password;
//       const updatedUser = await user.save();
//       res.send((err, token){
//         _id: updatedUser.id,
//         name: updatedUser.name,
//         email: updatedUser.email,
//         isAdmin: updatedUser.isAdmin,
//         token: getToken(updatedUser),
//       });
//     } else {
//       res.status(404).send({ message: 'User Not Found' });
//     }
// }


exports.userController = {
  findById: async (req, res) => {
    // console.log(req)
    const _id = req.params.id
    await User.find({_id})
    .then((user) => {
      let userData = user[0]
      // console.log(userData)
      res.status(200).json({userData})
    })
    .catch((err) => {
      console.log("Get user by id error:", err);
      res.status(500).json({
        errorMessage: err,
      });
    })
  }
}


exports.cartController = {
  saveCart: async(req, res) => {
    // console.log(req)
    const _id = req.params.id
    const data = req.body.data;
    // if (!(await User.find({ cart: { $in: [req.body.product] } }))) {
    //   res.status(500).json("Product is already in cart!");
    // } else {
      try {
        await User.updateOne(
          { _id },{ cart: data  }
        )
          .then(res => console.log(res.data))
          .catch(err => console.log(err));
      } catch {
        res.status(500).json("Please try again later!");
      }
  }
}


exports.imgController = {
  uploadAvatar: async(req, res) => {
    console.log("req.body", req.body)
    const _id = req.user._id
    try {
      const data = await User.updateOne({ _id },{ $set: { avatar: req.body }})
      console.log("data",data)
      res.status(200).json({
        successMessage: 'Avatar successfully uploaded!',
      })
    } catch(err){
      console.log("Error 413:",err)
      res.status(413).json({
        errorMessage: 'Error! Image is too large ! ',
      });
    }
    res.status(500).json({
      errorMessage: 'Error! upload avatar failed ! ',
    })
  }
}