export default function TaskFilter({ currentFilter, onFilterChange }) {
    const filters = [
      { id: 'all', label: 'All' },
      { id: 'active', label: 'Active' },
      { id: 'completed', label: 'Completed' }
    ];
  
    return (
      <div className="task-filter">
        {filters.map(filter => (
          <button
            key={filter.id}
            className={currentFilter === filter.id ? 'active' : ''}
            onClick={() => onFilterChange(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>
    );
  }