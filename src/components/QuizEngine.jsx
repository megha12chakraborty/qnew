import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import QUESTIONS from '../data/questions'

const PER_QUESTION_TIME = 15 // seconds

export default function QuizEngine() {
  const navigate = useNavigate()
  const player = JSON.parse(localStorage.getItem('player') || 'null')

  useEffect(() => {
    if (!player) navigate('/quiz')
  }, [player, navigate])

  const pool = useMemo(() => {
    if (!player) return []
    const subset = QUESTIONS
      .filter(q => q.category === player.category && q.difficulty === player.difficulty)
    // Fallback if empty
    return subset.length ? subset : QUESTIONS.slice(0, 8)
  }, [player])

  const [idx, setIdx] = useState(0)
  const [timeLeft, setTimeLeft] = useState(PER_QUESTION_TIME)
  const [selected, setSelected] = useState(Array(pool.length).fill(null)) // option string
  const [locked, setLocked] = useState(Array(pool.length).fill(false))
  const [perTimes, setPerTimes] = useState(Array(pool.length).fill(0)) // seconds spent on question
  const tickRef = useRef(null)

  // handle timer
  useEffect(() => {
    tickRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          // auto lock and auto-advance
          handleLockAndAdvance(true)
          return PER_QUESTION_TIME // will be reset in next q
        }
        // accumulate time on current question
        setPerTimes(prev => {
          const copy = [...prev]
          copy[idx] = (copy[idx] ?? 0) + 1
          return copy
        })
        return t - 1
      })
    }, 1000)
    return () => clearInterval(tickRef.current)
    // eslint-disable-next-line
  }, [idx])

  const current = pool[idx]

  const pick = (opt) => {
    if (locked[idx]) return
    const nextSel = [...selected]
    nextSel[idx] = opt
    setSelected(nextSel)
    // lock immediately after selection
    const nextLocked = [...locked]
    nextLocked[idx] = true
    setLocked(nextLocked)
  }

  const score = useMemo(() => {
    return pool.reduce((acc, q, i) => acc + (selected[i] === q.answer ? 1 : 0), 0)
  }, [pool, selected])

  const handleLockAndAdvance = (timeout = false) => {
    // ensure locked
    if (!locked[idx]) {
      const nextLocked = [...locked]
      nextLocked[idx] = true
      setLocked(nextLocked)
    }
    if (idx < pool.length - 1) {
      setIdx(idx + 1)
      setTimeLeft(PER_QUESTION_TIME)
    } else {
      // finish
      const totalTime = perTimes.reduce((a, b) => a + b, 0)
      const attempt = {
        name: player?.name ?? 'Player',
        category: player?.category ?? 'general',
        difficulty: player?.difficulty ?? 'easy',
        score,
        total: pool.length,
        timeTaken: totalTime,
        perQuestionTime: perTimes,
        date: new Date().toLocaleString(),
      }
      const history = JSON.parse(localStorage.getItem('history') || '[]')
      history.push(attempt)
      localStorage.setItem('history', JSON.stringify(history))
      localStorage.setItem('lastAttempt', JSON.stringify(attempt))
      navigate('/score')
    }
  }

  const prev = () => {
    if (idx === 0) return
    setIdx(idx - 1)
    setTimeLeft(PER_QUESTION_TIME) // fresh timer on revisit per spec
  }

  const percent = Math.round(((idx) / (pool.length)) * 100)

  return (
    <div className="container quiz">
      <div className="card">
        <div className="meta" style={{marginBottom:12}}>
          <div style={{display:'flex', gap:12, alignItems:'center'}}>
            <strong>Q{idx + 1}/{pool.length}</strong>
            <span aria-live="polite">⏱ {timeLeft}s</span>
          </div>
          <div>Score: {score}</div>
        </div>

        <div className="progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={percent}>
          <div style={{ width: `${percent}%` }} />
        </div>

        <p style={{marginTop:16}}>
          <q>{current.question}</q>
        </p>

        <div className="options">
          {current.options.map((opt, i) => {
            const isLocked = locked[idx]
            const isSelected = selected[idx] === opt
            const isCorrect = isLocked && opt === current.answer
            const isWrong = isLocked && isSelected && opt !== current.answer
            const cls =
              'option' +
              (isLocked ? ' locked' : '') +
              (isCorrect ? ' correct' : '') +
              (isWrong ? ' incorrect' : '')
            return (
              <button
                key={i}
                className={cls}
                onClick={() => pick(opt)}
                disabled={isLocked}
              >
                {opt}
              </button>
            )
          })}
        </div>

        <div className="meta" style={{marginTop:12}}>
          <div style={{display:'flex', gap:8}}>
            <button className="btn" onClick={prev} disabled={idx === 0}>← Back</button>
            <button className="btn primary" onClick={() => handleLockAndAdvance(false)}>Next →</button>
          </div>
          <div style={{opacity:.8}}>Spent on this question: {perTimes[idx] ?? 0}s</div>
        </div>
      </div>
    </div>
  )
}

