const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

const JWT_SECRET="7WK5T79u5mIzjIXXi2oI9Fglmgivv7RAJ7izyj9tUyQWWUU888882";

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);

    //this part for email should be unique
    const oldUser= await User.findOne({email:email});

    if(oldUser){
     return res.send({ data: "Account Already exists!"});
    }
 
     try{
      const hashedPassword = await bcrypt.hash(password, 10);
 
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });
      await newUser.save();  
         res.send({status: "ok",data: "User Created"});
     }catch(error){
         res.send({status: "error",data: error});
     }
  
});

// Route pour la connexion de l'utilisateur
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ error: "Email and password are required!" });
  }

  try {
    // Find user by email
    const oldUser = await User.findOne({ email: email });
     

    if (!oldUser) {
      return res.status(401).send({ error: "Invalid credentials" });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, oldUser.password);

    if (!isMatch) {
      return res.status(401).send({ error: "Invalid credentials" });
    }
   
    console.log(oldUser._id);
     // Parse the JSON string
    // Access the `_id`
    // Generate JWT token
    const token = jwt.sign(
      { id: oldUser._id, email: oldUser.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
  const id=oldUser._id;
    // Send token in response
    return res.status(200).send({ status: "ok", data:id });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).send({ error: "Server error" });
  }
});;

module.exports = router;
