import React, { useMemo, useState } from 'react'

export default function Leaderboard() {
  const [sortBy, setSortBy] = useState('score') // 'score' | 'timeTaken' | 'date'
  const history = JSON.parse(localStorage.getItem('history') || '[]')

  const sorted = useMemo(() => {
    const copy = [...history]
    if (sortBy === 'score') copy.sort((a,b) => b.score - a.score || a.timeTaken - b.timeTaken)
    if (sortBy === 'timeTaken') copy.sort((a,b) => a.timeTaken - b.timeTaken || b.score - a.score)
    if (sortBy === 'date') copy.sort((a,b) => new Date(b.date) - new Date(a.date))
    return copy
  }, [history, sortBy])

  return (
    <div className="container">
      <div className="card">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <h2 style={{marginTop:0}}>Leaderboard</h2>
          <div>
            <label style={{marginRight:8}}>Sort by:</label>
            <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)}>
              <option value="score">Score (desc)</option>
              <option value="timeTaken">Time (asc)</option>
              <option value="date">Date (newest)</option>
            </select>
          </div>
        </div>
        {sorted.length === 0 ? (
          <p>No attempts yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Player</th>
                <th>Category</th>
                <th>Difficulty</th>
                <th>Score</th>
                <th>Time (s)</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((h, i) => (
                <tr key={i}>
                  <td>{h.name}</td>
                  <td>{h.category}</td>
                  <td>{h.difficulty}</td>
                  <td>{h.score}/{h.total}</td>
                  <td>{h.timeTaken}</td>
                  <td>{h.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

