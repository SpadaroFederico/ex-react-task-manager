import React from "react";

// variabile per gestire lo stile in base allo stato del task

const getStatusStyle = (status) => {
  const styles = {
    padding: '8px',
    borderRadius: '4px',
    color: 'white',
    textAlign: 'center'
  };

  switch (status) {
    case 'To do' :
        return { ...styles, backgroundColor: 'red' };
    case 'Doing' :
        return { ...styles, backgroundColor: 'orange' };
    case 'Done' :
        return { ...styles, backgroundColor: 'green' };
    default:
        return styles
  }
};

const TaskRow = React.memo(({ task }) => {
    return (
        <tr>
            <td>{task.title}</td>
            <td>
                <div style={getStatusStyle(task.status)}>
                    {task.status}
                </div>
            </td>
            <td>{new Date (task.createdAt).toLocaleDateString()}</td>
        </tr>
    );
});

export default TaskRow;