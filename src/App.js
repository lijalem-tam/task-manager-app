import { useState, useEffect } from 'react';
import Task from './components/Task';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [
      { id: 1, title: 'Buy groceries', completed: false },
      { id: 2, title: 'Read a book', completed: true },
      { id: 3, title: 'Walk the dog', completed: false }
    ];
  });

  const [filter, setFilter] = useState('all');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    document.body.className = theme;
  }, [tasks, theme]);

  const addTask = (title) => {
    setTasks([...tasks, {
      id: Date.now(),
      title,
      completed: false,
      createdAt: new Date().toISOString()
    }]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`app ${theme}`}>
      <div className="container">
        <header>
          <h1>Task Manager</h1>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </header>
        
        <TaskForm onAdd={addTask} />
        <TaskFilter currentFilter={filter} onFilterChange={setFilter} />
        
        <div className="task-list">
          {filteredTasks.length > 0 ? (
            filteredTasks.map(task => (
              <Task
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            ))
          ) : (
            <p className="empty-message">
              {filter === 'all' 
                ? 'No tasks yet. Add one above!' 
                : filter === 'completed' 
                  ? 'No completed tasks' 
                  : 'No active tasks'}
            </p>
          )}
        </div>
        
        <div className="task-actions">
          <div className="task-count">
            {tasks.filter(t => !t.completed).length} {tasks.filter(t => !t.completed).length === 1 ? 'item' : 'items'} left
          </div>
          {tasks.some(task => task.completed) && (
            <button className="clear-completed" onClick={clearCompleted}>
              Clear completed
            </button>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default App;