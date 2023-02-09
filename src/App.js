import React, { useState } from 'react';
import './style.css';

const App = () => {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      const updatedTodo = todos.map((t) =>
        t.id === editId
          ? (t = { id: t.id, todo })
          : (t = { id: t.id, todo: t.todo })
      );
      setTodos(updatedTodo);
      setEditId(0);
      setTodo('');
      return;
    }

    if (todo !== '') {
      setTodos([{ id: `${todo}-${Date.now}`, todo }, ...todos]);
    }
    setTodo('');
  };

  const handleDelete = (id) => {
    const delTodos = todos.filter((todo) => todo.id !== id);
    setTodos(delTodos);
  };

  const handleEdit = (id) => {
    //find returns an object
    const editTodo = todos.find((i) => i.id === id);
    setTodo(editTodo.todo);
    setEditId(id);
  };

  return (
    <div className="app">
      <div className="container">
        <h1>Todo List App</h1>

        <form className="todoForm" onSubmit={handleSubmit}>
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button type="submit">{editId ? 'Edit' : 'Go'}</button>
        </form>

        <ul className="allTodos">
          {todos.map((t) => (
            <li className="singleTodo">
              <span className="todoText" key={t.id}>
                {t.todo}
              </span>
              <button
                onClick={() => {
                  handleEdit(t.id);
                }}
              >
                Edit
              </button>
              <button onClick={() => handleDelete(t.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
