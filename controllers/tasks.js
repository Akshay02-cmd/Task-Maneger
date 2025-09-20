const Task = require("../models/Task");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ error: error.message }); //500 server error
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(400).json({ error: error.message }); //400 bad request
  }
};

const getTask = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${id}` }); //404 not found
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ error: error.message }); //500 server error
  }
};

const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${id}` }); //404 not found
    }
    res.status(200).json({ task }); //200 ok
  } catch (error) {
    res.status(500).json({ error: error.message }); //500 server error
  }
};

const updateTask = async (req, res) => {
  try {
    const { id: TaskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: TaskID }, req.body, {
      new: true,
      runValidators: true
    });
    if(!task){
      return res.status(404).json({ msg: `No task with id: ${TaskID}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
