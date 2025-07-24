import type { TodoTypes } from '../types/todo';

const LOCAL_STORAGE_KEY = 'my_todos';

export const TodoService = {
    getTodos: (): TodoTypes[] => {
        const todosJson = localStorage.getItem(LOCAL_STORAGE_KEY);
        return todosJson ? JSON.parse(todosJson) : [];
    },

    addTodo: (newTodo: TodoTypes): TodoTypes[] => {
        const todos = TodoService.getTodos();
        const updatedTodos = [...todos, newTodo];
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
        return updatedTodos;
    },

    updateTodo: (todo: TodoTypes): TodoTypes => {
        const todos = TodoService.getTodos();
        const updatedTodos = todos.map((t) => (t.id === todo.id ? todo : t));
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
        return todo;
    },

    deleteTodo: (id: number): void => {
        const todos = TodoService.getTodos();
        const updatedTodos = todos.filter((t) => t.id !== id);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
    }
};