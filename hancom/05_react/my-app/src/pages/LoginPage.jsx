import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'

function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    // 카카오 OAuth 로그인 후 리다이렉트 시 세션을 감지해 사용자 정보를 localStorage에 저장
    const saveAndRedirect = (session) => {
      const user = session.user
      localStorage.setItem('currentUser', JSON.stringify({
        id: user.id,
        name: user.user_metadata?.nickname || user.user_metadata?.name || user.user_metadata?.full_name || '카카오 사용자',
        email: user.email || '',
        loginType: 'kakao'
      }))
      // navigate() 대신 location.href 사용 (OAuth 리다이렉트 후 라우터 상태가 불안정할 수 있어 강제 이동)
      window.location.href = '/'
    }

    // 이미 세션이 있는 경우 (새로고침 등) 즉시 처리
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) saveAndRedirect(session)
    })

    // 카카오 로그인 완료 후 발생하는 인증 상태 변경 이벤트 감지
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) saveAndRedirect(session)
    })

    // 컴포넌트 언마운트 시 이벤트 구독 해제
    return () => subscription.unsubscribe()
  }, [])

  // Supabase를 통해 카카오 OAuth 로그인 요청 (PKCE 방식으로 코드 교환은 Supabase 서버에서 처리)
  const handleKakaoLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: window.location.origin + '/login',
        scopes: 'profile_nickname account_email'
      }
    })
  }

  // 이메일/비밀번호 로그인: localStorage에 저장된 회원 정보와 비교
  const handleLogin = () => {
    setError('')
    if (!email || !password) { setError('이메일과 비밀번호를 입력해주세요.'); return }
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find(u => u.email === email && u.password === password)
    if (!user) { setError('이메일 또는 비밀번호가 올바르지 않아요.'); return }
    localStorage.setItem('currentUser', JSON.stringify({ id: user.id, name: user.name, email: user.email }))
    navigate('/')
  }

  return (
    <div className="container">
      <div className="auth-box">
        <h2 className="auth-title">로그인</h2>
        <div className="auth-form">
          <input className="auth-input" type="email" id="email" placeholder="이메일" value={email} onChange={e => setEmail(e.target.value)} />
          <input className="auth-input" type="password" id="password" placeholder="비밀번호" value={password} onChange={e => setPassword(e.target.value)} />
          <button className="btn btn-primary" id="btnLogin" style={{ width: '100%' }} onClick={handleLogin}>
            로그인
          </button>
          <div className="auth-divider">또는</div>
          <button id="btnKakaoLogin" className="btn-kakao" onClick={handleKakaoLogin}>
            <img src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_small.png" alt="kakao" />
            카카오로 로그인
          </button>
          <div className="auth-error" id="loginError">{error}</div>
        </div>
        <p className="auth-link">아직 계정이 없으신가요? <Link to="/signup">회원가입</Link></p>
      </div>
    </div>
  )
}

export default LoginPage
