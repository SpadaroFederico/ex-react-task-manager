import React, { useState, useMemo, useCallback } from 'react';
import useTasks from '../hooks/UseTasks';
import TaskRow from '../components/TaskRow';
import '../assets/styles/TaskListStyle.css';

function TaskList() {
  const { tasks } = useTasks();

  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const debounce = (callback, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        callback(...args);
      }, delay);
    };
  };

  const debouncedSetQuery = useCallback(
    debounce((value) => {
      setDebouncedQuery(value);
    }, 500),
    []
  );

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder((prev) => prev * -1);
    } else {
      setSortBy(column);
      setSortOrder(1);
    }
  };

  const filteredAndSortedTasks = useMemo(() => {
    const filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(debouncedQuery.toLowerCase())
    );

    return [...filtered].sort((a, b) => {
      let comparison = 0;
      if (sortBy === "title") {
        comparison = a.title.localeCompare(b.title);
      } else if (sortBy === "status") {
        const order = { "To do": 1, "Doing": 2, "Done": 3 };
        comparison = order[a.status] - order[b.status];
      } else if (sortBy === "createdAt") {
        comparison = new Date(a.createdAt) - new Date(b.createdAt);
      }
      return comparison * sortOrder;
    });
  }, [tasks, sortBy, sortOrder, debouncedQuery]);

  return (
    <>
      <input
        className='input-search'
        type="text"
        placeholder="Cerca per titolo"
        onChange={(e) => debouncedSetQuery(e.target.value)}
        style={{ marginBottom: "1rem", padding: "8px", width: "100%" }}
      />

      <table className='general-table'>
        <thead>
          <tr>
            <th onClick={() => handleSort('title')}>Titolo</th>
            <th onClick={() => handleSort('status')}>Stato</th>
            <th onClick={() => handleSort('createdAt')}>Data Creazione</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedTasks.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default TaskList;
