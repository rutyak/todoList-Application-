const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// Connect to MongoDB
//mongoose is the library use to established connection with mongoDB and express
//Users is the database here
//{ useNewUrlParser: true, useUnifiedTopology: true } this use to handle decrepted features
mongoose.connect('mongodb://localhost:27017/Users', { useNewUrlParser: true, useUnifiedTopology: true });

// Define User schema
//it is a structure of document within mongoDB
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});
//User represents the collections in mongoDB
const User = mongoose.model('User', userSchema);

// Signup endpoint
app.post('/signup', async (req, res) => {
  const { email, password } = req.body; // distructuring username and password
  // Hash the password before storing it in the database
  const hashedPassword = await bcrypt.hash(password, 10);

  //creating new on object
  const newUser = new User({
    email,
    password: hashedPassword,
  });

  //saving in mongoDB collection
  await newUser.save();
  //sending response to frontend
  res.status(200).json({ message: 'Signup successful!' });
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log("email from BE",email)
  // Find the user by username
  const user = await User.findOne({ email });
  
  // Check if the user exists and the password is correct
  if (user && await bcrypt.compare(password, user.password)) {
    res.status(200).json({ message: 'Login successful!' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});




