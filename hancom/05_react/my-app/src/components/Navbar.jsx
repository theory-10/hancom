import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from '../supabase'

const ADMIN_EMAIL = 'qkrwls@naver.com'
// 네비게이션 링크 대신 로그인/로그아웃 버튼을 표시할 페이지 경로
const AUTH_PAGES = ['/', '/login', '/signup']

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [user, setUser] = useState(null)

  // 페이지 이동 시마다 localStorage에서 현재 로그인 사용자 정보 갱신
  useEffect(() => {
    const stored = localStorage.getItem('currentUser')
    setUser(stored ? JSON.parse(stored) : null)
  }, [location.pathname])

  // 현재 경로가 인증 관련 페이지이거나 상세 페이지면 네비 링크 대신 로그인 버튼 표시
  const isAuthPage = AUTH_PAGES.includes(location.pathname) || location.pathname.startsWith('/detail')

  // 로그아웃: Supabase 세션 종료 후 localStorage 사용자 정보 삭제
  const handleLogout = async () => {
    await supabase.auth.signOut()
    localStorage.removeItem('currentUser')
    setUser(null)
    navigate('/')
  }

  return (
    <nav>
      <a href="/" className="nav-logo" onClick={e => { e.preventDefault(); navigate('/') }}>
        ✈ TravelPlan
      </a>

      {isAuthPage ? (
        <div id="navAuth">
          {user ? (
            <>
              {/* 관리자 이메일로 로그인한 경우에만 회원관리 메뉴 표시 */}
              {user.email === ADMIN_EMAIL && (
                <Link to="/admin" style={{ fontSize: '14px', color: '#f28b50', fontWeight: 600, textDecoration: 'none', marginRight: '16px' }}>
                  회원관리
                </Link>
              )}
              <span style={{ fontSize: '14px', color: '#555', marginRight: '12px' }}>
                <strong>{user.name}</strong>님
              </span>
              <button className="btn btn-secondary" style={{ padding: '8px 18px', fontSize: '13px' }} onClick={handleLogout}>
                로그아웃
              </button>
            </>
          ) : (
            <Link to="/login" className="btn btn-secondary" style={{ padding: '8px 18px', fontSize: '13px', textDecoration: 'none' }}>
              로그인
            </Link>
          )}
        </div>
      ) : (
        // 일반 페이지에서는 주요 기능 메뉴 링크 표시
        <ul className="nav-links">
          <li><Link to="/explore">여행지 탐색</Link></li>
          <li><Link to="/stay">숙소</Link></li>
          <li><Link to="/restaurant">식당</Link></li>
          <li><Link to="/weather">날씨</Link></li>
          <li><Link to="/checklist">체크리스트</Link></li>
        </ul>
      )}
    </nav>
  )
}

export default Navbar
