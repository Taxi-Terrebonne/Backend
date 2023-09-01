//to code for the admin login
const Admin = require("../models/auth")
const jwt = require("jsonwebtoken")
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
//for singup
const signup_auth = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;
  if (!username) {
    res.status(400);
    throw new Error("please add username");
  }
  if (!email) {
    res.status(400);
    throw new Error("please add email");
  }
  if (!password) {
    res.status(400);
    throw new Error("please add password");
  }

  // check if user exists
  const userExists = await Admin.findOne({ username });
  if (userExists) {
    res.status(400);
    throw new Error("Username already exists");
  }

  const admin = await Admin.create({
    username,
    password,
    email,
    userRole: 'Admin',
  });

  if (admin) {
    res.status(201).json({
      _id: admin.id,
      email: admin.email,
      username: admin.username,
      userRole: admin.userRole,
      token: generateToken(admin._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});


//for login
const login_get = asyncHandler(async (req, res) => {
  const { _id, username, userRole, email } = await Admin.findById(req.admin.id)
  res.status(200).json({
    id: _id,
    username,
    userRole,
    email
  })
})

const login_auth = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });

  if (!admin) {
    res.status(401).json({ message: "Wrong email or password" });
    return;
  }

  if (admin && (await bcrypt.compare(password, admin.password))) {
    res.json({
      _id: admin.id,
      username: admin.username,
      userRole: admin.userRole,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } else {
    res.status(401).json({ message: "Wrong email or password" });
  }
});


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  login_get,
  login_auth,
  signup_auth
}