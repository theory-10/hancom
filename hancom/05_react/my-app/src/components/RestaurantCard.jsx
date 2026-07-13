function RestaurantCard({ restaurant }) {
  return (
    <div className="card">
      <div className="card-body">
        <div className="card-title">{restaurant.name}</div>
        <div className="card-sub">{restaurant.cuisine}</div>
        <div className="card-desc">{restaurant.desc}</div>
        <div className="rating">{'★'.repeat(Math.round(restaurant.rating))} {restaurant.rating}</div>
        <div style={{ marginTop: '8px', fontWeight: 700, color: '#f28b50' }}>
          평균 {restaurant.price.toLocaleString()}원
        </div>
      </div>
    </div>
  )
}

export default RestaurantCard
