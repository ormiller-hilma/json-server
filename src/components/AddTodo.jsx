import React, { useState } from "react";

function AddTodo({ user, onAdd }) {
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAdd() {
    if (!newTask.trim()) return;

    setLoading(true);

    try {
      const newTodo = {
        userId: user.id,
        title: newTask,
        completed: false,
      };

      const response = await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo),
      });

      if (!response.ok) throw new Error("Failed to add todo");
      const refreshed = await fetch(
        `http://localhost:3000/todos?userId=${user.id}`
      ).then((res) => res.json());

      onAdd(refreshed);
      setNewTask("");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        placeholder="Add new task..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        disabled={loading}
      />
      <button onClick={handleAdd} disabled={loading}>
        {loading ? "Adding..." : "Add"}
      </button>
    </div>
  );
}

export default AddTodo;
