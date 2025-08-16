import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const close = () => setOpen(false)

  return (
    <nav className="navbar">
      <div className="nav-inner">
        <div className="brand">
          <div className="logo" />
          <h1>Interactive Quiz</h1>
        </div>
        <div className="nav-links">
          <Link to="/" aria-current={pathname === '/' ? 'page' : undefined}>Home</Link>
          <Link to="/quiz">Start Quiz</Link>
          <Link to="/leaderboard">Scores</Link>
          <Link to="/about">About</Link>
          <Link to="/quiz">
            <button className="nav-cta">Start</button>
          </Link>
        </div>
        <button className="hamburger" onClick={() => setOpen(!open)} aria-label="Menu">☰</button>
      </div>

      {open && (
        <div className="mobile-menu" onClick={close}>
          <Link to="/">Home</Link>
          <Link to="/quiz">Start Quiz</Link>
          <Link to="/leaderboard">Scores</Link>
          <Link to="/about">About</Link>
        </div>
      )}
    </nav>
  )
}
