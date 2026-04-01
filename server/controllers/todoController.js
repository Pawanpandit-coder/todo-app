import Todo from "../models/todoModel.js";

// get all todos api
export const allTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ message: "failed to fetch" });
  }
};

// delete particular todo api
export const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Successfully deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete" });
  }
};

// add a todo API
export const addTodo = async (req, res) => {
  const { title, completed } = req.body;

  try {
    const userId = req.user.id; // ---------------------------2nd change
    const newTodo = await Todo.create({ title, completed,user:userId });
    res.status(200).json(newTodo);
  } catch (err) {
    res.status(500).json({ message: "something wrong to add todo" });
  }
};

// mark todo API
export const markTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found." });
    }

    todo.completed = !todo.completed;
    await todo.save();

    res.status(200).json({ message: "marked todo successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to mark" });
  }
};

// Filteration Todo API
export const filterTodo = async (req, res) => {
  const { filter } = req.query;
  try {
    let query = {
      user: req.user.id,
    };
    if (filter === "completed") {
      query.completed = true;
    } else if (filter === "pending") {
      query.completed = false;
    }
    //  else {
    //   query.completed;
    // }
    const filteredItems = await Todo.find(query);
    res.status(200).json(filteredItems);
  } catch (err) {
    res.status(200).json({ message: "Failed to fetch filtered items" });
  }
};
