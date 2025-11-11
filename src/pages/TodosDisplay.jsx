import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContx";

function TodosDisplay() {
  const { user } = useContext(UserContext);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;

    async function fetchTodos() {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3000/todos?userid=${user.id}`
        );
        if (!response.ok) throw new Error("Failed to load todos");

        const data = await response.json();
        setTodos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTodos();
  }, [user]);

  async function toggleTodo(todo) {
    const updatedTodo = { ...todo, completed: !todo.completed };
    try {
      const response = await fetch(`http://localhost:3000/todos/${todo.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: updatedTodo.completed }),
      });

      if (!response.ok) throw new Error("Failed to update todo");

      setTodos((prev) => prev.map((t) => (t.id === todo.id ? updatedTodo : t)));
    } catch (err) {
      alert(err.message);
    }
  }

  if (!user) return <p>Please log in to see your tasks.</p>;
  if (loading) return <p>Loading todos...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (todos.length === 0) return <p>No todos found.</p>;

  return (
    <div>
      <h2>{user.username}'s Tasks</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span onClick={() => toggleTodo(todo)}>{todo.title}</span>
            <span>
              {todo.completed ? (
                <span style={{ color: "green" }}>✔</span>
              ) : (
                <span style={{ color: "orange" }}>✖</span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodosDisplay;
