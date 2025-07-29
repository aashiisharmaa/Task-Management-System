
const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  try {
    const task = new Task({ ...req.body, createdBy: req.user.id });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const { status, assignedUser, dueDate } = req.query;
    const query = { $or: [{ createdBy: req.user.id }, { assignedUser: req.user.id }] };
    if (status) query.status = status;
    if (assignedUser) query.assignedUser = assignedUser;
    if (dueDate) query.dueDate = { $lte: new Date(dueDate) };
    const tasks = await Task.find(query).populate('assignedUser', 'name');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.markComplete = async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(req.params.id, { status: 'Completed' }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};