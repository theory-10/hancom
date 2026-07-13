import { useNavigate } from 'react-router-dom'
import { destinations } from '../data/destinations'

function MainPage() {
  const navigate = useNavigate()

  const groups = {}
  destinations.forEach(dest => {
    if (!groups[dest.region]) groups[dest.region] = []
    groups[dest.region].push(dest)
  })

  const handleClick = (dest) => {
    localStorage.setItem('selectedDest', JSON.stringify(dest))
    navigate(`/detail/${dest.id}`)
  }

  return (
    <div className="container">
      <div className="main-banner">
        <h1>국내 여행, 어디로 떠날까요?</h1>
        <p>여행지를 선택하면 일정·비용을 바로 계획할 수 있어요</p>
      </div>

      <div id="destinationList">
        {Object.entries(groups).map(([region, dests]) => (
          <div key={region} className="region-section">
            <h3 className="region-title">{region}</h3>
            <div className="card-grid">
              {dests.map(dest => (
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
        ))}
      </div>
    </div>
  )
}

export default MainPage
