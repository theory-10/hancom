import { useState } from 'react'
import { destinations } from '../data/destinations'
import { restaurants } from '../data/restaurants'

function RestaurantPage() {
  const [selectedDest, setSelectedDest] = useState('')
  const [selectedRest, setSelectedRest] = useState(null)
  const [form, setForm] = useState({ date: '', time: '', guests: '2' })
  const [result, setResult] = useState('')

  const filtered = selectedDest
    ? restaurants.filter(r => r.destinationId === Number(selectedDest))
    : restaurants

  const showReserveForm = (r) => {
    setSelectedRest(r)
    setResult('')
    setForm({ date: '', time: '', guests: '2' })
  }

  const handleReserve = () => {
    const { date, time, guests } = form
    if (!date || !time) { alert('날짜와 시간을 선택해주세요.'); return }
    const saved = JSON.parse(localStorage.getItem('reservations') || '[]')
    saved.push({ type: 'restaurant', name: selectedRest.name, date, time, guests: Number(guests) })
    localStorage.setItem('reservations', JSON.stringify(saved))
    setResult(`✅ ${selectedRest.name} 예약 완료! (${date} ${time}, ${guests}명)`)
  }

  const getDest = (r) => destinations.find(d => String(d.id) === String(r.destinationId))

  return (
    <div className="container">
      <h2 className="page-title">식당 추천</h2>

      <div className="form-group">
        <select id="destFilter" value={selectedDest} onChange={e => setSelectedDest(e.target.value)}>
          <option value="">전체 여행지</option>
          {destinations.map(d => (
            <option key={d.id} value={String(d.id)}>{d.name}</option>
          ))}
        </select>
      </div>

      <div className="card-grid" id="restaurantList">
        {filtered.map(r => {
          const dest = getDest(r)
          return (
            <div key={r.id} className="card">
              <div className="card-body">
                <div className="card-sub">{dest ? dest.name : ''} · {r.cuisine}</div>
                <div className="card-title">{r.name}</div>
                <div className="card-desc">
                  <span className="rating">★ {r.rating}</span>
                  &nbsp;· 평균 {r.price.toLocaleString()}원
                </div>
                <button
                  className="btn btn-primary"
                  style={{ marginTop: '12px', width: '100%' }}
                  onClick={() => showReserveForm(r)}
                >
                  예약하기
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {selectedRest && (
        <div id="reserveArea">
          <div className="reserve-form">
            <h3>📋 {selectedRest.name} 예약</h3>
            <div className="form-group">
              <input type="date" id="resDate" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
              <input type="time" id="resTime" value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))} />
              <input type="number" id="guests" placeholder="인원" min="1" value={form.guests} onChange={e => setForm(f => ({ ...f, guests: e.target.value }))} />
              <button className="btn btn-primary" id="btnReserve" onClick={handleReserve}>예약 확정</button>
            </div>
            {result && <div className="reserve-result">{result}</div>}
          </div>
        </div>
      )}
    </div>
  )
}

export default RestaurantPage
