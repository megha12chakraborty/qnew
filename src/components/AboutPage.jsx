import React from 'react'

export default function AboutPage() {
  return (
    <div className="container">
      <div className="card">
        <h2 style={{marginTop:0}}>About This App</h2>
        <p>This React SPA uses <code>react-router-dom</code>, localStorage for persistence, and pure CSS animations.</p>
        <ul>
          <li>Timer per question with auto-advance on timeout</li>
          <li>Option lock + correct/incorrect highlighting</li>
          <li>Back navigation (fresh timer on revisit)</li>
          <li>Progress bar and per-question time stats</li>
          <li>Leaderboard with sorting</li>
        </ul>
        <p style={{marginTop:12}}>What I learned: component state, effects, routing, and data persistence.</p>
        <p>Also, memes:</p>
        <img src="https://i.imgflip.com/30b1gx.jpg" width="260" alt="Distracted Boyfriend Meme" />
      </div>
    </div>
  )
}
