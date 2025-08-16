import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AddPlayerForm() {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const saved = localStorage.getItem('player')
    if (saved) {
      const p = JSON.parse(saved)
      setName(p.name || '')
      setCategory(p.category || '')
      setDifficulty(p.difficulty || '')
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !category || !difficulty) return
    const player = { name, category, difficulty, date: new Date().toLocaleString() }
    localStorage.setItem('player', JSON.stringify(player))
    navigate('/quiz/start')
  }

  return (
    <div className="container">
      <div className="card">
        <h3>Add Player</h3>
        <form onSubmit={handleSubmit} className="row">
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select Category</option>
            <option value="general">General Knowledge</option>
            <option value="science">Science</option>
            <option value="tech">Technology</option>
          </select>
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="">Select Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <button className="btn primary" type="submit" disabled={!name || !category || !difficulty}>
            Start
          </button>
        </form>
      </div>
    </div>
  )
}
