import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { destinations } from '../data/destinations'
import { stays } from '../data/stays'
import { restaurants } from '../data/restaurants'
import { stayImages, restaurantImages, cafeData, cafeImages, rankBadge } from '../data/images'

const DAY_NAMES = ['일', '월', '화', '수', '목', '금', '토']

// 날짜 객체를 YY.MM.DD 형식의 문자열로 변환
const formatDate = (date) => {
  const y = String(date.getFullYear()).slice(2)
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}.${m}.${d}`
}

// 시간 정보를 제거한 순수 날짜 객체 반환 (날짜 비교 시 시간 차이로 인한 오차 방지)
const toDay = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate())

function DetailPage() {
  // URL 파라미터에서 여행지 id를 가져와 해당 여행지 데이터 조회
  const { id } = useParams()
  const dest = destinations.find(d => String(d.id) === id)

  // 달력 상태: 현재 보여주는 연도/월, 선택한 시작일/종료일
  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState(new Date().getMonth())
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  // 일정 관련 상태: 저장된 일정 목록, 입력 필드값, 완료 메시지
  const [schedules, setSchedules] = useState([])
  const [schedTitle, setSchedTitle] = useState('')
  const [schedCost, setSchedCost] = useState('')
  const [schedMsg, setSchedMsg] = useState('')

  // 결제 및 예약 관련 상태
  const [payResult, setPayResult] = useState('')
  const [selectedStay, setSelectedStay] = useState(null)
  const [selectedRest, setSelectedRest] = useState(null)
  const [stayForm, setStayForm] = useState({ checkIn: '', checkOut: '', guests: '1' })
  const [restForm, setRestForm] = useState({ date: '', time: '', guests: '2' })
  const [stayResult, setStayResult] = useState('')
  const [restResult, setRestResult] = useState('')
  const [stayReservations, setStayReservations] = useState([])
  const [restReservations, setRestReservations] = useState([])

  // 컴포넌트 마운트 시 localStorage에서 일정 및 예약 데이터 불러오기
  useEffect(() => {
    const all = JSON.parse(localStorage.getItem('schedules') || '[]')
    setSchedules(all.filter(s => s.destinationId === (dest?.id)))
    const allRes = JSON.parse(localStorage.getItem('reservations') || '[]')
    setStayReservations(allRes.filter(r => r.type === 'stay'))
    setRestReservations(allRes.filter(r => r.type === 'restaurant'))
  }, [id])

  if (!dest) return <p>여행지를 찾을 수 없어요.</p>

  // 현재 여행지에 해당하는 숙소/식당/카페 데이터 필터링
  const destStays = stays.filter(s => Number(s.destinationId) === Number(dest.id))
  const destRestaurants = restaurants.filter(r => Number(r.destinationId) === Number(dest.id))
  const destCafes = cafeData[Number(dest.id)] || []

  // 시작일과 종료일 사이의 박 수 계산
  const nights = startDate && endDate
    ? Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))
    : 0

  // 달력 날짜 셀에 CSS 클래스 부여 (시작일 / 종료일 / 범위 내)
  const getDayClass = (d) => {
    const thisDate = toDay(new Date(year, month, d))
    let cls = 'cal-day'
    if (startDate && toDay(startDate).getTime() === thisDate.getTime()) cls += ' cal-start'
    else if (endDate && toDay(endDate).getTime() === thisDate.getTime()) cls += ' cal-end'
    else if (startDate && endDate && thisDate > toDay(startDate) && thisDate < toDay(endDate)) cls += ' cal-range'
    return cls
  }

  // 달력 날짜 클릭 시 시작일/종료일 순서로 선택 처리
  const handleDayClick = (d) => {
    const clicked = new Date(year, month, d)
    if (!startDate || (startDate && endDate)) {
      // 처음 클릭이거나 이미 범위가 선택된 경우 → 시작일 재설정
      setStartDate(clicked)
      setEndDate(null)
    } else {
      // 시작일만 선택된 상태에서 종료일 설정 (시작일보다 이전이면 시작일로 대체)
      if (clicked > startDate) setEndDate(clicked)
      else { setStartDate(clicked); setEndDate(null) }
    }
  }

  // 선택된 날짜 범위를 텍스트로 반환 (달력 하단에 표시)
  const getDateRangeText = () => {
    if (startDate && endDate) return `${formatDate(startDate)} ~ ${formatDate(endDate)}`
    if (startDate) return `${formatDate(startDate)} ~ 종료일을 선택하세요`
    return '날짜를 선택하세요'
  }

  // 해당 월의 달력 셀 배열 생성 (첫째 날 요일에 맞게 빈 칸 추가)
  const renderCalendar = () => {
    const firstDay = new Date(year, month, 1).getDay()
    const lastDate = new Date(year, month + 1, 0).getDate()
    const cells = []
    for (let i = 0; i < firstDay; i++) cells.push(<div key={`e${i}`} />)
    for (let d = 1; d <= lastDate; d++) {
      cells.push(
        <div key={d} className={getDayClass(d)} onClick={() => handleDayClick(d)}>
          {d}
        </div>
      )
    }
    return cells
  }

  // 일정 추가: 유효성 검사 후 localStorage에 저장하고 목록에 반영
  const addSchedule = () => {
    if (!startDate || !endDate) { alert('시작일과 종료일을 모두 선택해주세요.'); return }
    if (!schedTitle.trim()) { alert('일정 내용을 입력해주세요.'); return }
    const dateRange = `${formatDate(startDate)} ~ ${formatDate(endDate)}`
    const newItem = {
      id: Date.now(),
      destinationId: dest.id,
      dateRange,
      title: schedTitle,
      cost: Number(schedCost) || 0,
    }
    const all = JSON.parse(localStorage.getItem('schedules') || '[]')
    all.push(newItem)
    localStorage.setItem('schedules', JSON.stringify(all))
    setSchedules(prev => [...prev, newItem])
    setSchedTitle('')
    setSchedCost('')
    setSchedMsg(`✅ "${schedTitle}" 일정이 예약됐어요!`)
    setTimeout(() => setSchedMsg(''), 3000)
  }

  // 일정 삭제: id로 해당 항목을 localStorage와 상태에서 제거
  const deleteSchedule = (schedId) => {
    const all = JSON.parse(localStorage.getItem('schedules') || '[]')
    localStorage.setItem('schedules', JSON.stringify(all.filter(s => s.id !== schedId)))
    setSchedules(prev => prev.filter(s => s.id !== schedId))
  }

  // 일정 비용 총합 계산
  const total = schedules.reduce((sum, s) => sum + (Number(s.cost) || 0), 0)

  // 결제 버튼 클릭 시 총합계 금액으로 결제 완료 메시지 표시
  const handlePay = () => {
    if (total === 0) { alert('예약된 일정이 없어요.'); return }
    setPayResult(`✅ ${total.toLocaleString()}원 결제가 완료됐어요!`)
  }

  // 숙소 예약: 중복 체크 후 localStorage에 저장하고 예약 목록에 추가
  const handleStayReserve = () => {
    const { checkIn, checkOut, guests } = stayForm
    if (!checkIn || !checkOut) { alert('날짜를 선택해주세요.'); return }
    // 같은 숙소명 + 같은 체크인/체크아웃 날짜면 중복 예약 차단
    const isDuplicate = stayReservations.some(r => r.name === selectedStay.name && r.checkIn === checkIn && r.checkOut === checkOut)
    if (isDuplicate) { alert('이미 동일한 내용의 예약된 숙소가 있습니다.'); return }
    const newItem = { id: Date.now(), type: 'stay', name: selectedStay.name, checkIn, checkOut, guests: Number(guests) }
    const saved = JSON.parse(localStorage.getItem('reservations') || '[]')
    saved.push(newItem)
    localStorage.setItem('reservations', JSON.stringify(saved))
    setStayReservations(prev => [...prev, newItem])
    setStayResult(`✅ ${selectedStay.name} 예약 완료! (${checkIn} ~ ${checkOut}, ${guests}명)`)
  }

  // 식당 예약: 중복 체크 후 localStorage에 저장하고 예약 목록에 추가
  const handleRestReserve = () => {
    const { date, time, guests } = restForm
    if (!date || !time) { alert('날짜와 시간을 선택해주세요.'); return }
    // 같은 식당명 + 같은 날짜/시간이면 중복 예약 차단
    const isDuplicate = restReservations.some(r => r.name === selectedRest.name && r.date === date && r.time === time)
    if (isDuplicate) { alert('이미 동일한 내용으로 예약 되어있습니다.'); return }
    const newItem = { id: Date.now(), type: 'restaurant', name: selectedRest.name, date, time, guests: Number(guests) }
    const saved = JSON.parse(localStorage.getItem('reservations') || '[]')
    saved.push(newItem)
    localStorage.setItem('reservations', JSON.stringify(saved))
    setRestReservations(prev => [...prev, newItem])
    setRestResult(`✅ ${selectedRest.name} 예약 완료! (${date} ${time}, ${guests}명)`)
  }

  // 숙소 예약 삭제: id로 해당 항목을 localStorage와 상태에서 제거
  const deleteStayReservation = (itemId) => {
    const saved = JSON.parse(localStorage.getItem('reservations') || '[]')
    localStorage.setItem('reservations', JSON.stringify(saved.filter(r => r.id !== itemId)))
    setStayReservations(prev => prev.filter(r => r.id !== itemId))
  }

  // 식당 예약 삭제: id로 해당 항목을 localStorage와 상태에서 제거
  const deleteRestReservation = (itemId) => {
    const saved = JSON.parse(localStorage.getItem('reservations') || '[]')
    localStorage.setItem('reservations', JSON.stringify(saved.filter(r => r.id !== itemId)))
    setRestReservations(prev => prev.filter(r => r.id !== itemId))
  }

  return (
    <div className="container">
      {/* 여행지 대표 이미지 및 기본 정보 */}
      <div id="destInfo" style={{ marginBottom: '40px' }}>
        <img src={dest.image} alt={dest.name} style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: '16px', marginBottom: '16px' }} />
        <h2 style={{ fontSize: '26px', fontWeight: 800 }}>{dest.name}</h2>
        <p style={{ color: '#888', marginTop: '6px' }}>{dest.region} · {dest.description}</p>
      </div>

      {/* 일정 계획 섹션: 달력(왼쪽) + 일정 입력/목록/결제(오른쪽) */}
      <h2 className="page-title">일정 계획</h2>
      <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-end' }}>
        {/* 왼쪽: 달력 */}
        <div style={{ flex: '0 0 420px' }}>
          <div className="calendar-wrap">
            <div className="calendar-header">
              <button onClick={() => {
                if (month === 0) { setYear(y => y - 1); setMonth(11) }
                else setMonth(m => m - 1)
              }}>‹</button>
              <span>{year}년 {month + 1}월</span>
              <button onClick={() => {
                if (month === 11) { setYear(y => y + 1); setMonth(0) }
                else setMonth(m => m + 1)
              }}>›</button>
            </div>
            <div className="calendar-grid">
              {DAY_NAMES.map(n => <div key={n} className="cal-day-name">{n}</div>)}
              {renderCalendar()}
            </div>
            <div className={`date-range-display${startDate && endDate ? ' active' : ''}`}>
              {getDateRangeText()}
            </div>
          </div>
        </div>

        {/* 오른쪽: 일정 입력 폼 + 목록 + 총합계 + 결제 */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <input
              type="text"
              id="scheduleTitle"
              placeholder="일정 내용"
              value={schedTitle}
              onChange={e => setSchedTitle(e.target.value)}
              style={{ flex: 3, minWidth: 0, height: '52px', borderRadius: '14px', border: '2px solid #ddd', textAlign: 'left', paddingLeft: '16px', fontSize: '15px' }}
            />
            <input
              type="number"
              id="scheduleCost"
              placeholder="인원"
              min="0"
              value={schedCost}
              onChange={e => setSchedCost(e.target.value)}
              style={{ flex: 2, minWidth: 0, height: '52px', borderRadius: '14px', border: '2px solid #ddd', textAlign: 'left', paddingLeft: '16px', fontSize: '15px' }}
            />
            <button className="btn btn-primary" onClick={addSchedule} style={{ flex: 1, height: '52px', padding: '0 8px', fontSize: '13px', whiteSpace: 'nowrap' }}>예약</button>
          </div>
          {schedMsg && (
            <div style={{ marginTop: '10px', padding: '12px 16px', background: '#fff5f0', borderRadius: '10px', fontSize: '14px', color: '#f28b50', fontWeight: 600 }}>
              {schedMsg}
            </div>
          )}
          {/* 추가된 일정 목록 */}
          <div id="scheduleList" style={{ marginTop: '10px' }}>
            {schedules.map(s => (
              <div key={s.id} className="list-item" style={{ fontSize: '13px', padding: '8px 12px' }}>
                <div className="list-item-info">
                  <span className="list-item-title">{s.dateRange} / {s.title}</span>
                  <span className="list-item-sub">{Number(s.cost).toLocaleString()}원</span>
                </div>
                <button className="btn btn-danger" style={{ fontSize: '12px', padding: '4px 10px' }} onClick={() => deleteSchedule(s.id)}>삭제</button>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '12px' }}>
            <div className="total-box" id="totalBox" style={{ flex: 1, marginTop: 0 }}>총 합계: {total.toLocaleString()}원</div>
            <button className="btn btn-primary" onClick={handlePay} style={{ flexShrink: 0 }}>결제</button>
          </div>
          {payResult && <div className="pay-result">{payResult}</div>}
        </div>
      </div>

      {/* 날짜 선택 후 표시되는 예약 가능 숙소 목록 (박 수 기반 가격 계산) */}
      <div id="availableStays">
        {startDate && endDate && destStays.length > 0 && (
          <>
            <p style={{ margin: '16px 0 10px', fontWeight: 600, color: '#555' }}>
              예약 가능한 숙소 ({nights}박)
            </p>
            <div className="card-grid">
              {destStays.map(stay => {
                const totalCost = stay.price * nights
                return (
                  <div
                    key={stay.id}
                    className={`card stay-pick-card${schedTitle === stay.name ? ' selected' : ''}`}
                    onClick={() => {
                      // 카드 클릭 시 일정 입력 필드에 숙소명과 총 비용 자동 입력
                      setSchedTitle(stay.name)
                      setSchedCost(String(totalCost))
                    }}
                  >
                    <img src={stayImages[stay.type] || stayImages['호텔']} alt={stay.name} />
                    <div className="card-body">
                      <div className="card-sub">{stay.type}</div>
                      <div className="card-title">{stay.name}</div>
                      <div className="card-desc" style={{ marginTop: '6px' }}>
                        <span className="rating">★ {stay.rating}</span>
                        &nbsp;·&nbsp; {nights}박 <strong>{totalCost.toLocaleString()}원</strong>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>

      <div className="section-divider" />

      {/* 숙소 섹션: 카드 목록 + 예약 폼 + 예약 내역 */}
      <h2 className="page-title">숙소</h2>
      <div className="card-grid">
        {destStays.map(stay => (
          <div key={stay.id} className="card">
            <img src={stayImages[stay.type] || stayImages['호텔']} alt={stay.name} />
            <div className="card-body">
              <div className="card-sub">{stay.type}</div>
              <div className="card-title">{stay.name}</div>
              <div className="card-desc">{stay.desc}</div>
              <div className="card-desc" style={{ marginTop: '8px' }}>
                <span className="rating">★ {stay.rating}</span>
                &nbsp;·&nbsp; 1박 <strong>{stay.price.toLocaleString()}원</strong>
              </div>
              <button
                className="btn btn-primary"
                style={{ marginTop: '14px', width: '100%' }}
                onClick={() => { setSelectedStay(stay); setStayResult('') }}
              >
                예약하기
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* 선택된 숙소의 예약 입력 폼 */}
      {selectedStay && (
        <div id="stayReserveArea">
          <div className="reserve-form">
            <h3>📋 {selectedStay.name} 예약</h3>
            <div className="form-group">
              <input type="date" id="checkIn" value={stayForm.checkIn} onChange={e => setStayForm(f => ({ ...f, checkIn: e.target.value }))} />
              <input type="date" id="checkOut" value={stayForm.checkOut} onChange={e => setStayForm(f => ({ ...f, checkOut: e.target.value }))} />
              <input type="number" id="stayGuests" placeholder="인원" min="1" value={stayForm.guests} onChange={e => setStayForm(f => ({ ...f, guests: e.target.value }))} />
              <button className="btn btn-primary" onClick={handleStayReserve}>예약</button>
            </div>
            {stayResult && <div className="reserve-result">{stayResult}</div>}
          </div>
        </div>
      )}
      {/* 숙소 예약 내역 목록 */}
      {stayReservations.map(r => (
        <div key={r.id} className="list-item">
          <div className="list-item-info">
            <span className="list-item-title">{r.name}</span>
            <span className="list-item-sub">{r.checkIn} ~ {r.checkOut} · {r.guests}명</span>
          </div>
          <button className="btn btn-danger" onClick={() => deleteStayReservation(r.id)}>삭제</button>
        </div>
      ))}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '12px' }}>
        <div className="total-box" style={{ flex: 1, marginTop: 0 }}>총 합계: {total.toLocaleString()}원</div>
        <button className="btn btn-primary" onClick={handlePay} style={{ flexShrink: 0 }}>결제</button>
      </div>

      <div className="section-divider" />

      {/* 식당 섹션: 카드 목록 + 예약 폼 + 예약 내역 */}
      <h2 className="page-title">식당</h2>
      <div className="card-grid">
        {destRestaurants.map(r => (
          <div key={r.id} className="card">
            <img src={restaurantImages[r.cuisine] || restaurantImages['한식']} alt={r.name} />
            <div className="card-body">
              <div className="card-sub">{r.cuisine}</div>
              <div className="card-title">{r.name}</div>
              <div className="card-desc">{r.desc}</div>
              <div className="card-desc" style={{ marginTop: '8px' }}>
                <span className="rating">★ {r.rating}</span>
                &nbsp;·&nbsp; 평균 <strong>{r.price.toLocaleString()}원</strong>
              </div>
              <button
                className="btn btn-primary"
                style={{ marginTop: '14px', width: '100%' }}
                onClick={() => { setSelectedRest(r); setRestResult('') }}
              >
                예약하기
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* 선택된 식당의 예약 입력 폼 */}
      {selectedRest && (
        <div id="restaurantReserveArea">
          <div className="reserve-form">
            <h3>📋 {selectedRest.name} 예약</h3>
            <div className="form-group">
              <input type="date" id="resDate" value={restForm.date} onChange={e => setRestForm(f => ({ ...f, date: e.target.value }))} />
              <input type="time" id="resTime" value={restForm.time} onChange={e => setRestForm(f => ({ ...f, time: e.target.value }))} />
              <input type="number" id="resGuests" placeholder="인원" min="1" value={restForm.guests} onChange={e => setRestForm(f => ({ ...f, guests: e.target.value }))} />
              <button className="btn btn-primary" onClick={handleRestReserve}>예약</button>
            </div>
            {restResult && <div className="reserve-result">{restResult}</div>}
          </div>
        </div>
      )}
      {/* 식당 예약 내역 목록 */}
      {restReservations.map(r => (
        <div key={r.id} className="list-item">
          <div className="list-item-info">
            <span className="list-item-title">{r.name}</span>
            <span className="list-item-sub">{r.date} {r.time} · {r.guests}명</span>
          </div>
          <button className="btn btn-danger" onClick={() => deleteRestReservation(r.id)}>삭제</button>
        </div>
      ))}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '12px' }}>
        <div className="total-box" style={{ flex: 1, marginTop: 0 }}>총 합계: {total.toLocaleString()}원</div>
        <button className="btn btn-primary" onClick={handlePay} style={{ flexShrink: 0 }}>결제</button>
      </div>

      <div className="section-divider" />

      {/* 추천 카페 섹션: 랭킹 순위별 카페 정보 표시 */}
      <h2 className="page-title">추천 카페</h2>
      <div id="cafeDisplay">
        <div className="card-grid">
          {destCafes.map(cafe => (
            <div key={cafe.rank} className="card cafe-rank-card">
              <div className="cafe-rank-badge">{rankBadge[cafe.rank - 1]}</div>
              <img src={cafeImages[cafe.rank - 1]} alt={cafe.name} />
              <div className="card-body">
                <div className="cafe-rank-num">TOP {cafe.rank}</div>
                <div className="card-title">{cafe.name}</div>
                <div className="card-desc" style={{ marginTop: '6px' }}>{cafe.desc}</div>
                <div className="card-desc" style={{ marginTop: '8px' }}>
                  대표메뉴&nbsp; <strong>{cafe.menu}</strong>
                </div>
                <div className="card-desc" style={{ marginTop: '4px' }}>
                  가격 <strong>{cafe.price.toLocaleString()}원</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DetailPage
