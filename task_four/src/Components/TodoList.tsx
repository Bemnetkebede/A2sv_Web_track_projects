import React, { useState } from 'react';
import type { TodoTypes } from '../types/todo';

interface Props {
    todos: TodoTypes[];
    onDelete: (id: number) => void;
    onUpdate: (todo: TodoTypes) => void;
}

const TodoList: React.FC<Props> = ({ todos, onDelete, onUpdate }) => {
const [editedTodoId, setEditedTodoId] = useState<number | null>(null);
const [editedText, setEditedText] = useState('');

const handleEditStart = (id: number, text: string) => {
setEditedTodoId(id);
setEditedText(text);
};

const handleEditCancel = () => {
setEditedTodoId(null);
setEditedText('');
};

const handleEditSave = (id: number) => {
if (editedText.trim()) {
    const original = todos.find((t) => t.id === id);
    if (original) {
    onUpdate({
        id,
        text: editedText,
        completed: original.completed,
    });
    handleEditCancel();
    }
}
};

return (
<ul  className="todo-list">
    {todos.map((todo) => (
    <li key={todo.id}>
        <input
        type="checkbox"
        checked={todo.completed}
        onChange={() =>
            onUpdate({ ...todo, completed: !todo.completed })
        }
        style={{ marginRight: '8px' }}
        />
        {editedTodoId === todo.id ? (
        <div className='edit-cont'>
            <input
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className='edit-input'
            />
            <button onClick={() => handleEditSave(todo.id)}>Save</button>
            <button onClick={handleEditCancel}>Cancel</button>
        </div>
        ) : (
        <>
            <span
            style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
            }}
            >
            {todo.text}
            </span>
            <button onClick={() => handleEditStart(todo.id, todo.text)}>
            Edit
            </button>
            <button onClick={() => onDelete(todo.id)}>Delete</button>
        </>
        )}
    </li>
    ))}
</ul>
);
};

export default TodoList;

