import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Docs from './pages/Docs';
import Insights from './pages/Insights';
import Engage from './pages/Engage';
import Assist from './pages/Assist';

export default function App() {
  // Track active button state
  const [active, setActive] = useState('assist');

  // Handle button click
  const handleClick = (btn) => {
    setActive(btn);
  };

  return (
    <div>
      <header className="header">
        <nav className="container nav">
          <Link to="/" className="flex space-between" style={{ gap: 8 }}>
            <img src="/logo.svg" alt="iNextLabs" style={{ height: 28, width: 28 }} />
            <strong>iNextLabs AI Suite</strong>
          </Link>
          <div className="links">
            <Link className={`btn ${active === 'docs' ? 'btn-primary' : ''}`} to="/docs" onClick={() => handleClick('docs')}> DocsAI </Link>
            <Link className={`btn ${active === 'insights' ? 'btn-primary' : ''}`} to="/insights" onClick={() => handleClick('insights')}> InsightsAI </Link>
            <Link className={`btn ${active === 'engage' ? 'btn-primary' : ''}`} to="/engage" onClick={() => handleClick('engage')} > EngageAI </Link>
            <Link className={`btn ${active === 'assist' ? 'btn-primary' : ''}`} to="/assist"onClick={() => handleClick('assist')}> AssistAI </Link>
          </div>
        </nav>
      </header>

      <main className="container" style={{ paddingTop: 24, paddingBottom: 24 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/engage" element={<Engage />} />
          <Route path="/assist" element={<Assist />} />
        </Routes>
      </main>

      <footer className="container footer">
        <div className="card p-5 space-between" style={{ flexWrap: 'wrap', gap: 12 }}>
          <span>© {new Date().getFullYear()} iNextLabs (Assessment Demo)</span>
          <div className="links">
            <a
              className="btn"
              href="https://inextlabs.ai"
              target="_blank"
              rel="noreferrer"
            >
              About iNextLabs
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
