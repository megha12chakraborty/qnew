import React from 'react'
import { Link } from 'react-router-dom'
import heroImg from '../assets/hero-image.svg'

export default function Hero() {
  return (
    <section className="hero">
      <div className="card">
        <h2>Build. Play. Improve.</h2>
        <p>Test your knowledge with timed questions, instant answer feedback, and a live progress bar.</p>
        <div className="cta">
          <Link to="/quiz"><button className="btn primary">Start Quiz</button></Link>
          <Link to="/leaderboard"><button className="btn">View Scores</button></Link>
        </div>
      </div>
      <div className="hero-visual">
        <img src={heroImg} alt="Quiz Illustration" />
      </div>
    </section>
  )
}

