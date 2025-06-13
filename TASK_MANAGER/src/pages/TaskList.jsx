import React, { useState, useMemo } from 'react';
import useTasks from '../hooks/UseTasks';
import TaskRow from '../components/TaskRow';

function TaskList() {
  const { tasks } = useTasks();

  const [sortBy, setSortBy] = useState('createdAt'); // default: createdAt
  const [sortOrder, setSortOrder] = useState(1);     // default: crescente

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder((prev) => prev * -1); // inverte direzione
    } else {
      setSortBy(column);
      setSortOrder(1); // resetta a crescente
    }
  };

  const sortedTasks = useMemo(() => {
    const tasksCopy = [...tasks];

    tasksCopy.sort((a, b) => {
      let comparison = 0;

      if (sortBy === 'title') {
        comparison = a.title.localeCompare(b.title);
      } else if (sortBy === 'status') {
        const statusOrder = { 'To do': 0, 'Doing': 1, 'Done': 2 };
        comparison = statusOrder[a.status] - statusOrder[b.status];
      } else if (sortBy === 'createdAt') {
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }

      return comparison * sortOrder;
    });

    return tasksCopy;
  }, [tasks, sortBy, sortOrder]);

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => handleSort('title')}>Titolo</th>
          <th onClick={() => handleSort('status')}>Stato</th>
          <th onClick={() => handleSort('createdAt')}>Data Creazione</th>
        </tr>
      </thead>
      <tbody>
        {sortedTasks.map((task) => (
          <TaskRow key={task.id} task={task} />
        ))}
      </tbody>
    </table>
  );
}

export default TaskList;
