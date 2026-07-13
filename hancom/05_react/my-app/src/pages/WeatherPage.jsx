import { useState, useEffect } from 'react'
import { destinations } from '../data/destinations'

const weatherData = {
  1: { icon: '☀️', temp: 28, desc: '맑음',    humidity: 60 },
  2: { icon: '🌤',  temp: 24, desc: '구름 조금', humidity: 55 },
  3: { icon: '🌧',  temp: 18, desc: '비',       humidity: 80 },
  4: { icon: '⛅',  temp: 32, desc: '흐림',     humidity: 75 },
}

function WeatherPage() {
  const [selectedId, setSelectedId] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('selectedDest')
    if (saved) {
      const dest = JSON.parse(saved)
      setSelectedId(String(dest.id))
    }
  }, [])

  const dest = destinations.find(d => String(d.id) === selectedId)
  const w = dest
    ? (weatherData[Number(selectedId)] || { icon: '🌈', temp: 25, desc: '정보 없음', humidity: 60 })
    : null

  return (
    <div className="container">
      <h2 className="page-title">여행지 날씨</h2>

      <div className="form-group">
        <select id="destSelect" value={selectedId} onChange={e => setSelectedId(e.target.value)}>
          <option value="">여행지를 선택하세요</option>
          {destinations.map(d => (
            <option key={d.id} value={String(d.id)}>{d.name}</option>
          ))}
        </select>
      </div>

      <div id="weatherDisplay">
        {dest && w && (
          <div className="weather-card">
            <div className="weather-icon">{w.icon}</div>
            <div style={{ fontSize: '20px', fontWeight: 700 }}>{dest.name}</div>
            <div className="weather-temp">{w.temp}°C</div>
            <div className="weather-desc">{w.desc}</div>
            <div style={{ marginTop: '12px', fontSize: '14px', opacity: 0.85 }}>습도 {w.humidity}%</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default WeatherPage
