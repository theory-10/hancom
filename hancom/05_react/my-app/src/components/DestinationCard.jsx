import { useNavigate } from 'react-router-dom'

function DestinationCard({ destination }) {
  const navigate = useNavigate()

  return (
    <div className="card" onClick={() => navigate(`/detail/${destination.id}`)}>
      <img src={destination.image} alt={destination.name} />
      <div className="card-body">
        <div className="card-title">{destination.name}</div>
        <div className="card-sub">{destination.region}</div>
        <div className="card-desc">{destination.description}</div>
      </div>
    </div>
  )
}

export default DestinationCard
