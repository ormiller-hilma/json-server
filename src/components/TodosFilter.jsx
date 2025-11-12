import React from "react";

function TodosFilter({ filter, setFilter, search, setSearch, sort, setSort }) {
  return (
    <div className="todoFilters">
      <input
        type="text"
        placeholder="Search task..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="incomplete">Incomplete</option>
      </select>

      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="">Sort by...</option>
        <option value="az">A → Z</option>
        <option value="za">Z → A</option>
      </select>
    </div>
  );
}

export default TodosFilter;
