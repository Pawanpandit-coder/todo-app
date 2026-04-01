import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    completed: { type: Boolean, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // 👈 kis user ka hai
      required: true,
    },
  },
  { timestamps: true },
);

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
