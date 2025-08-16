import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container">
      <div className="card">
        <h2 style={{marginTop:0}}>404 — Page not found</h2>
        <Link to="/"><button className="btn">Go Home</button></Link>
      </div>
    </div>
  )
}
