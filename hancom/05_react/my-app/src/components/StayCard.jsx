function StayCard({ stay }) {
  return (
    <div className="card">
      <div className="card-body">
        <div className="card-title">{stay.name}</div>
        <div className="card-sub">{stay.type}</div>
        <div className="card-desc">{stay.desc}</div>
        <div className="rating">{'★'.repeat(Math.round(stay.rating))} {stay.rating}</div>
        <div style={{ marginTop: '8px', fontWeight: 700, color: '#f28b50' }}>
          {stay.price.toLocaleString()}원 / 박
        </div>
      </div>
    </div>
  )
}

export default StayCard
