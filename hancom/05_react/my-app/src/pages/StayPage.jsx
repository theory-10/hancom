import { useState } from 'react'
import { destinations } from '../data/destinations'
import { stays } from '../data/stays'

function StayPage() {
  const [selectedDest, setSelectedDest] = useState('')
  const [selectedStay, setSelectedStay] = useState(null)
  const [form, setForm] = useState({ checkIn: '', checkOut: '', guests: '1' })
  const [result, setResult] = useState('')

  const filtered = selectedDest
    ? stays.filter(s => s.destinationId === Number(selectedDest))
    : stays

  const showReserveForm = (stay) => {
    setSelectedStay(stay)
    setResult('')
    setForm({ checkIn: '', checkOut: '', guests: '1' })
  }

  const handleReserve = () => {
    const { checkIn, checkOut, guests } = form
    if (!checkIn || !checkOut) { alert('날짜를 선택해주세요.'); return }
    const saved = JSON.parse(localStorage.getItem('reservations') || '[]')
    saved.push({ type: 'stay', name: selectedStay.name, checkIn, checkOut, guests: Number(guests), price: selectedStay.price })
    localStorage.setItem('reservations', JSON.stringify(saved))
    setResult(`✅ ${selectedStay.name} 예약 완료! (${checkIn} ~ ${checkOut}, ${guests}명)`)
  }

  const getDest = (stay) => destinations.find(d => String(d.id) === String(stay.destinationId))

  return (
    <div className="container">
      <h2 className="page-title">숙소 추천</h2>

      <div className="form-group">
        <select id="destFilter" value={selectedDest} onChange={e => setSelectedDest(e.target.value)}>
          <option value="">전체 여행지</option>
          {destinations.map(d => (
            <option key={d.id} value={String(d.id)}>{d.name}</option>
          ))}
        </select>
      </div>

      <div className="card-grid" id="stayList">
        {filtered.map(stay => {
          const dest = getDest(stay)
          return (
            <div key={stay.id} className="card">
              <div className="card-body">
                <div className="card-sub">{dest ? dest.name : ''}</div>
                <div className="card-title">{stay.name}</div>
                <div className="card-desc">
                  <span className="rating">★ {stay.rating}</span>
                  &nbsp;· 1박 {stay.price.toLocaleString()}원
                </div>
                <button
                  className="btn btn-primary"
                  style={{ marginTop: '12px', width: '100%' }}
                  onClick={() => showReserveForm(stay)}
                >
                  예약하기
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {selectedStay && (
        <div id="reserveArea">
          <div className="reserve-form">
            <h3>📋 {selectedStay.name} 예약</h3>
            <div className="form-group">
              <input type="date" id="checkIn" value={form.checkIn} onChange={e => setForm(f => ({ ...f, checkIn: e.target.value }))} />
              <input type="date" id="checkOut" value={form.checkOut} onChange={e => setForm(f => ({ ...f, checkOut: e.target.value }))} />
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

export default StayPage
