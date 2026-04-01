import express from 'express'
const router = express.Router();
import {allTodos, deleteTodo, addTodo, markTodo, filterTodo} from '../controllers/todoController.js'
import { protect } from '../middleware/authMiddleware.js';

// router.get('/', allTodos)
router.get('/', protect,  filterTodo)        // /api/todos
router.post('/',protect, addTodo)          // /api/todos
router.delete('/:id',protect, deleteTodo)  // /api/todos/:id
router.put('/:id',protect, markTodo)       // /api/todos/:id


// router.get('/todos', filterTodo)
// router.post('/todo', addTodo)
// router.delete('/todos/:id', deleteTodo)
// router.put('/todos/:id', markTodo)

export default router;