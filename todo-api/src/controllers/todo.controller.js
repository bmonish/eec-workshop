const Todo = require("../models/todo.model");

exports.list = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.create = async (req, res) => {
  const { title } = req.body;

  try {
    const newTodo = new Todo({
      title,
    });

    const todo = await newTodo.save();

    res.json(todo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.delete = async (req, res) => {
  try {
    let todo = await Todo.findOne({ _id: req.params.id });

    if (!todo) return res.status(404).json({ msg: "Todo not found" });

    await Todo.deleteOne({ _id: req.params.id });

    res.json({ msg: "Todo removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
