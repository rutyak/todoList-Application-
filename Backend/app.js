// ------------------------------------------Task-Database--------------------------------------
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/Users', { useNewUrlParser: true, useUnifiedTopology: true });

const taskSchema = new mongoose.Schema({
    task: String,
    description: String,
    time: String, 
    date: Number, 
    priority: String
  });
  
  // tasks represents the collections in MongoDB
  let Task = mongoose.model('tasks', taskSchema); 
  
  app.post('/taskform', async (req, res) => {
    const { task, desc, time, dayOfMonth, priority } = req.body;
  
    // creating new task object
    const newTask = new Task({ 
      task,
      description: desc,
      time,
      date: dayOfMonth, 
      priority
    });
  
    // saving in MongoDB collection
    await newTask.save();
  
    // sending response to frontend
    res.status(200).json({ message: 'Task added successfully!'});
  });
  

// ------------------------------------task-fetching-------------------------------------

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find(); // Fetch all tasks
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });