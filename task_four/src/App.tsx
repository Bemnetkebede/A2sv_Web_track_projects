import React, { useState, useEffect } from 'react';
import type { TodoTypes } from './types/todo';
import { TodoService } from './Services/TodoService';
import TodoForm from './Components/TodoForm';
import TodoList from './Components/TodoList';
import './Css/styles.css'

const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoTypes[]>([]);

  useEffect(() => {
    setTodos(TodoService.getTodos());
  }, []);

  const addTodo = (todo: TodoTypes) => {
    const updated = TodoService.addTodo(todo);
    setTodos(updated);
  };

  const updateTodo = (todo: TodoTypes) => {
    TodoService.updateTodo(todo);
    setTodos(TodoService.getTodos());
  };

  const deleteTodo = (id: number) => {
    TodoService.deleteTodo(id);
    setTodos(TodoService.getTodos());
  };

  return (
    <div className="App">
      <h1 className="header">My Todo List</h1>
      <TodoForm onAdd={addTodo} />
      <TodoList todos={todos} onDelete={deleteTodo} onUpdate={updateTodo} />
    </div>
  );
};

export default App;

