import { Link } from 'react-router-dom'
import './TermCard.css'

function TermCard({ term }) {
  return (
    <Link to={`/term/${term.id}`} className="term-card">
      <h3 className="term-card-name">{term.name}</h3>
      <p className="term-card-short">{term.short}</p>
    </Link>
  )
}

export default TermCard
