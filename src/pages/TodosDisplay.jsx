import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/UserContx";
import TodoItem from "../components/TodoItem";
import AddTodo from "../components/AddTodo";
import TodosFilter from "../components/TodosFilter";

function TodosDisplay() {
  const { user } = useContext(UserContext);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!user) return;

    async function fetchTodos() {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3000/todos?userId=${user.id}`
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

  if (!user) return <p>Please log in to see your tasks.</p>;
  if (loading) return <p>Loading todos...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const filteredTodos = todos
    .filter((todo) => {
      if (filter === "completed") return todo.completed;
      if (filter === "incomplete") return !todo.completed;
      return true;
    })
    .filter((todo) => todo.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "az") return a.title.localeCompare(b.title);
      if (sort === "za") return b.title.localeCompare(a.title);
      return 0;
    });

  return (
    <div className="todoDisplay">
      <h2>{user.username}'s Tasks</h2>

      <AddTodo user={user} onAdd={setTodos} />

      <TodosFilter
        filter={filter}
        setFilter={setFilter}
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
      />

      {filteredTodos.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onUpdate={setTodos} />
        ))
      )}
    </div>
  );
}

export default TodosDisplay;
