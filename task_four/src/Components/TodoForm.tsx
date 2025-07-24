import React, { useState } from 'react';
import type { TodoTypes } from '../types/todo';

interface Props {
    onAdd: (todo: TodoTypes) => void;
}

const TodoForm: React.FC<Props> = ({ onAdd }) => {
    const [text, setText] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
        const newTodo: TodoTypes = {
            id: Date.now(),
            text,
            completed: false
        };
        onAdd(newTodo);
        setText('');
        }
    };
    return (
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            placeholder="Add a todo..."
            value={text}
            onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Add</button>
        </form>
    );
};

export default TodoForm;
