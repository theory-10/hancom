import { terms } from '../data/terms'
import TermCard from '../components/TermCard'
import './HomePage.css'

function HomePage() {
  return (
    <main className="home">
      <h1>React 용어 사전</h1>
      <div className="home-grid">
        {terms.map((term) => (
          <TermCard key={term.id} term={term} />
        ))}
      </div>
    </main>
  )
}

export default HomePage
