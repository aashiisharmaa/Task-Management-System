import React, { useState, useEffect } from 'react';
import API from '../api/axios';

const TaskForm = ({ taskToEdit, onTaskSubmit, users }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedUser, setAssignedUser] = useState('');
  const [status, setStatus] = useState('Pending');
  const [priority, setPriority] = useState('Low');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title || '');
      setDescription(taskToEdit.description || '');
      setAssignedUser(taskToEdit.assignedUser?._id || '');
      setStatus(taskToEdit.status || 'Pending');
      setPriority(taskToEdit.priority || 'Low');
      // Format date for input type="date"
      setDueDate(taskToEdit.dueDate ? new Date(taskToEdit.dueDate).toISOString().split('T')[0] : '');
    } else {
      // Clear form when no task is being edited
      setTitle('');
      setDescription('');
      setAssignedUser('');
      setStatus('Pending');
      setPriority('Low');
      setDueDate('');
    }
  }, [taskToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const taskData = {
      title,
      description,
      assignedUser: assignedUser || null, // Ensure null if not selected
      status,
      priority,
      dueDate: dueDate || null, // Ensure null if not selected
    };

    try {
      if (taskToEdit) {
        await API.put(`/tasks/${taskToEdit._id}`, taskData);
      } else {
        await API.post('/tasks', taskData);
      }
      onTaskSubmit(); // Call the prop function to refresh tasks and clear form
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save task.');
      console.error('Task submission error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
      <div>
        <label htmlFor="title" style={{ display: 'block', marginBottom: '5px' }}>Title:</label>
        <input
          type="text"
          id="title"
          style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description" style={{ display: 'block', marginBottom: '5px' }}>Description:</label>
        <textarea
          id="description"
          rows="3"
          style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div>
        <label htmlFor="assignedUser" style={{ display: 'block', marginBottom: '5px' }}>Assigned User:</label>
        <select
          id="assignedUser"
          style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }}
          value={assignedUser}
          onChange={(e) => setAssignedUser(e.target.value)}
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="status" style={{ display: 'block', marginBottom: '5px' }}>Status:</label>
        <select
          id="status"
          style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div>
        <label htmlFor="priority" style={{ display: 'block', marginBottom: '5px' }}>Priority:</label>
        <select
          id="priority"
          style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }}
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div>
        <label htmlFor="dueDate" style={{ display: 'block', marginBottom: '5px' }}>Due Date:</label>
        <input
          type="date"
          id="dueDate"
          style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }}
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <button
        type="submit"
        style={{ padding: '10px 15px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}
      >
        {taskToEdit ? 'Update Task' : 'Create Task'}
      </button>
      {taskToEdit && (
        <button
          type="button"
          onClick={() => onTaskSubmit()} // Clear editing state without submitting
          style={{ padding: '10px 15px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '5px' }}
        >
          Cancel Edit
        </button>
      )}
    </form>
  );
};

export default TaskForm;