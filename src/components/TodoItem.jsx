import { useState } from "react";

function TodoItem({ todo, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const [updating, setUpdating] = useState(false);

  async function toggleCompleted() {
    try {
      setUpdating(true);
      const response = await fetch(`http://localhost:3000/todos/${todo.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !todo.completed }),
      });
      if (!response.ok) throw new Error("Failed to update todo");

      const updated = await response.json();
      onUpdate((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    } catch (err) {
      alert(err.message);
    } finally {
      setUpdating(false);
    }
  }

  async function saveTitle() {
    try {
      setUpdating(true);
      const response = await fetch(`http://localhost:3000/todos/${todo.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle }),
      });
      if (!response.ok) throw new Error("Failed to save todo");

      const updated = await response.json();
      onUpdate((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
      setEditing(false);
    } catch (err) {
      alert(err.message);
    } finally {
      setUpdating(false);
    }
  }

  async function deleteTodo() {
    try {
      setUpdating(true);
      const response = await fetch(`http://localhost:3000/todos/${todo.id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete todo");

      onUpdate((prev) => prev.filter((t) => t.id !== todo.id));
    } catch (err) {
      alert(err.message);
    } finally {
      setUpdating(false);
    }
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "5px",
        gap: "10px",
      }}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        disabled={updating}
        onChange={toggleCompleted}
      />

      {editing ? (
        <>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button onClick={saveTitle} disabled={updating}>
            Save
          </button>
          <button onClick={() => setEditing(false)} disabled={updating}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <span
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            {todo.title}
          </span>
          <button onClick={() => setEditing(true)} disabled={updating}>
            ✏️
          </button>
          <button onClick={deleteTodo} disabled={updating}>
            🗑️
          </button>
        </>
      )}
    </div>
  );
}

export default TodoItem;
