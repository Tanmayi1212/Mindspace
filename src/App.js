import React from 'react';
import { FaPen, FaBookOpen, FaRobot } from 'react-icons/fa';
import './App.css';

function App() {
  return (
    <div>
      <button className="signup-btn" onClick={() => window.location.href='/signup'}>
        Sign Up
      </button>
      <div className="hero">
        <h1>Welcome to MindSpace</h1>
      </div>
      <div className="main-content">
        <div className="button-group">
          <button className="btn-primary" onClick={() => window.location.href='/journal'}>
            <FaPen /> Write a Journal Entry
          </button>
          <button className="btn-secondary" onClick={() => window.location.href='/entries'}>
            <FaBookOpen /> View All Entries
          </button>
          <button className="btn-secondary" onClick={() => window.location.href='/ai-reflection'}>
            <FaRobot /> Try AI Reflection
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;