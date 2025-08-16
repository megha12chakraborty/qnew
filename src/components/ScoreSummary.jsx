import React, { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function ScoreSummary() {
  const navigate = useNavigate()
  const player = JSON.parse(localStorage.getItem('player') || 'null')
  const attempt = JSON.parse(localStorage.getItem('lastAttempt') || 'null')

  if (!attempt) {
    navigate('/')
    return null
  }

  const message = useMemo(() => {
    const pct = (attempt.score / attempt.total) * 100
    if (pct >= 90) return 'Quiz Champion! 🏆'
    if (pct >= 70) return 'Great job! 🔥'
    if (pct >= 50) return 'Nice try — keep going! 💪'
    return 'More caffeine, maybe? ☕'
  }, [attempt])

  const reset = () => {
    // keep history; just clear current player
    localStorage.removeItem('player')
  }

  return (
    <div className="container">
      <div className="card">
        <h2 style={{marginTop:0}}>Score Summary</h2>
        <p><strong>Player:</strong> {player?.name ?? attempt.name}</p>
        <p><strong>Score:</strong> {attempt.score} / {attempt.total}</p>
        <p><strong>Total time:</strong> {attempt.timeTaken}s</p>
        <p><strong>Date:</strong> {attempt.date}</p>

        <h3 style={{marginTop:12}}>{message}</h3>

        {attempt.perQuestionTime?.length ? (
          <div style={{marginTop:10}}>
            <strong>Per-question time (s):</strong>
            <div style={{display:'flex', flexWrap:'wrap', gap:8, marginTop:6}}>
              {attempt.perQuestionTime.map((t,i) => (
                <span key={i} className="btn" style={{padding:'6px 10px'}}>Q{i+1}: {t}</span>
              ))}
            </div>
          </div>
        ) : null}

        <div style={{display:'flex', gap:10, marginTop:16}}>
          <Link to="/"><button className="btn primary" onClick={reset}>Play Again</button></Link>
          <Link to="/leaderboard"><button className="btn">View Leaderboard</button></Link>
        </div>
      </div>
    </div>
  )
}

