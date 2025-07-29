import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]); // To populate assignedUser dropdown
  const [filterStatus, setFilterStatus] = useState('');
  const [filterAssignedUser, setFilterAssignedUser] = useState('');
  const [filterDueDate, setFilterDueDate] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, [filterStatus, filterAssignedUser, filterDueDate]);

  const fetchTasks = async () => {
    try {
      const params = {
        status: filterStatus,
        assignedUser: filterAssignedUser,
        dueDate: filterDueDate,
      };
      const res = await API.get('/tasks', { params });
      setTasks(res.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  const fetchUsers = async () => {
    try {
      // IMPORTANT: Ensure you have a backend endpoint like /api/users/all
      // that returns a list of all registered users for this to work.
      // If not, you might need to mock users or add that endpoint.
      const res = await API.get('/users/all'); // This endpoint needs to exist on your backend
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
      // Fallback for demonstration if /users/all doesn't exist or is not implemented yet
      setUsers([
        { _id: '60c72b2f9b1e8b0015b8e4e1', name: 'Demo User 1' },
        { _id: '60c72b2f9b1e8b0015b8e4e2', name: 'Demo User 2' },
      ]);
    }
  };

  const handleTaskSubmit = () => {
    setEditingTask(null); // Clear editing state
    fetchTasks(); // Refresh tasks after create/update
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await API.delete(`/tasks/${id}`);
        fetchTasks();
      } catch (err) {
        console.error('Error deleting task:', err);
      }
    }
  };

  const handleMarkComplete = async (id) => {
    try {
      await API.put(`/tasks/${id}/complete`);
      fetchTasks();
    } catch (err) {
      console.error('Error marking task complete:', err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '25px' }}>Task Dashboard</h1>

      <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.5em', marginBottom: '20px' }}>{editingTask ? 'Edit Task' : 'Create New Task'}</h2>
        <TaskForm
          taskToEdit={editingTask}
          onTaskSubmit={handleTaskSubmit}
          users={users}
        />
      </div>

      <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.5em', marginBottom: '20px' }}>Filter Tasks</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <div>
            <label htmlFor="filterStatus" style={{ display: 'block', marginBottom: '5px' }}>Status:</label>
            <select
              id="filterStatus"
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }}
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">All</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div>
            <label htmlFor="filterAssignedUser" style={{ display: 'block', marginBottom: '5px' }}>Assigned User:</label>
            <select
              id="filterAssignedUser"
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }}
              value={filterAssignedUser}
              onChange={(e) => setFilterAssignedUser(e.target.value)}
            >
              <option value="">All</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="filterDueDate" style={{ display: 'block', marginBottom: '5px' }}>Due Date (on or before):</label>
            <input
              type="date"
              id="filterDueDate"
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }}
              value={filterDueDate}
              onChange={(e) => setFilterDueDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div>
        <h2 style={{ fontSize: '1.5em', marginBottom: '20px' }}>Your Tasks</h2>
        {tasks.length === 0 ? (
          <p style={{ color: '#555' }}>No tasks found. Create a new task!</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onMarkComplete={handleMarkComplete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;