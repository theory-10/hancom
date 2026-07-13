import { useNavigate } from 'react-router-dom'
import { destinations } from '../data/destinations'

function ExplorePage() {
  const navigate = useNavigate()

  const handleClick = (dest) => {
    localStorage.setItem('selectedDest', JSON.stringify(dest))
    navigate(`/detail/${dest.id}`)
  }

  return (
    <div className="container">
      <h2 className="page-title">여행지 탐색</h2>
      <div className="card-grid">
        {destinations.map(dest => (
          <div key={dest.id} className="card" onClick={() => handleClick(dest)}>
            <img src={dest.image} alt={dest.name} />
            <div className="card-body">
              <div className="card-sub">{dest.region}</div>
              <div className="card-title">{dest.name}</div>
              <div className="card-desc">{dest.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExplorePage
