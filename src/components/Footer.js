export default function Footer() {
    return (
      <footer className="app-footer">
        <p>© {new Date().getFullYear()} Task Manager App</p>
        <div className="footer-links">
          <a href="#" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="#" target="_blank" rel="noopener noreferrer">Documentation</a>
          <a href="#" target="_blank" rel="noopener noreferrer">About</a>
        </div>
      </footer>
    );
  }