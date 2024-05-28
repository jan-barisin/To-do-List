import { useReducer } from 'react';
import './App.css';
import TodoList from './Components/TodoList';
import AddTodo from './Components/AddTodo';

let idCounter = 0;

function tasksReducer(tasks, action) {
  switch (action.type) {
    case "ADD_TODO":
      const newTodo = {
        id: idCounter++,
        completed: false,
        text: action.text,
      };
      return [...tasks, newTodo];
    case "CHECKBOX_TOGGLE":
      return tasks.map((currentTodo) =>
        currentTodo.id === action.taskId
          ? { ...currentTodo, completed: !currentTodo.completed }
          : currentTodo
      );
    case "DELETE_TODO":
      return tasks.filter((currentTodo) => currentTodo.id !== action.taskId);
    case "EDIT_TEXT":
      return tasks.map((currentTodo) =>
        currentTodo.id === action.taskId
          ? { ...currentTodo, text: action.newText }
          : currentTodo
      );
    case "CLEAR_ALL":
      return [];
    default:
      return tasks;
  }

}

function App() {
  const [todos, dispatch] = useReducer(tasksReducer, []);
  return (
    <div className="container">
      <h1>To-do list</h1>
      <AddTodo dispatch={dispatch} />
      <TodoList todos={todos} dispatch={dispatch} />
    </div>
  );
}

export default App;
