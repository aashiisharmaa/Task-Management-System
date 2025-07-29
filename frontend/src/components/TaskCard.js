import React from 'react';

const TaskCard = ({ task, onEdit, onDelete, onMarkComplete }) => {
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending':
        return { backgroundColor: '#ffeeba', color: '#856404' }; // Yellowish
      case 'In Progress':
        return { backgroundColor: '#b8daff', color: '#004085' }; // Blueish
      case 'Completed':
        return { backgroundColor: '#d4edda', color: '#155724' }; // Greenish
      default:
        return { backgroundColor: '#e2e3e5', color: '#383d41' }; // Grayish
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Low':
        return { color: 'green' };
      case 'Medium':
        return { color: 'orange' };
      case 'High':
        return { color: 'red' };
      default:
        return { color: 'gray' };
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div style={{ background: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '220px' }}>
      <div>
        <h3 style={{ fontSize: '1.2em', fontWeight: 'bold', marginBottom: '10px' }}>{task.title}</h3>
        <p style={{ color: '#555', marginBottom: '10px' }}>{task.description}</p>
        <p style={{ marginBottom: '5px' }}><strong>Assigned To: </strong>{task.assignedUser ? task.assignedUser.name : 'Unassigned'}</p>
        <p style={{ marginBottom: '5px' }}>
          <strong>Status: </strong>
          <span style={{ ...getStatusStyle(task.status), padding: '4px 8px', borderRadius: '12px', fontSize: '0.8em' }}>
            {task.status}
          </span>
        </p>
        <p style={{ marginBottom: '5px' }}>
          <strong>Priority: </strong>
          <span style={getPriorityColor(task.priority)}>
            {task.priority}
          </span>
        </p>
        <p style={{ marginBottom: '15px' }}><strong>Due Date: </strong>{formatDate(task.dueDate)}</p>
      </div>
      <div style={{ display: 'flex', gap: '10px', marginTop: '10px', flexWrap: 'wrap' }}>
        <button
          onClick={() => onEdit(task)}
          style={{ padding: '8px 12px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task._id)}
          style={{ padding: '8px 12px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Delete
        </button>
        {task.status !== 'Completed' && (
          <button
            onClick={() => onMarkComplete(task._id)}
            style={{ padding: '8px 12px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Mark Complete
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskCard;

