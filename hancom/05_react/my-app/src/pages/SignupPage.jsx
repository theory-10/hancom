import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function SignupPage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError] = useState('')

  const handleSignup = () => {
    setError('')
    if (!name || !email || !password || !passwordConfirm) {
      setError('모든 항목을 입력해주세요.'); return
    }
    if (password.length < 6) {
      setError('비밀번호는 6자 이상이어야 해요.'); return
    }
    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않아요.'); return
    }
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    if (users.find(u => u.email === email)) {
      setError('이미 사용 중인 이메일이에요.'); return
    }
    users.push({ name, email, password, joinedAt: new Date().toLocaleDateString('ko-KR') })
    localStorage.setItem('users', JSON.stringify(users))
    setError('✅ 가입 완료! 로그인 페이지로 이동합니다.')
    setTimeout(() => navigate('/login'), 1500)
  }

  return (
    <div className="container">
      <div className="auth-box">
        <h2 className="auth-title">회원가입</h2>
        <div className="auth-form">
          <input className="auth-input" type="text" id="name" placeholder="이름" value={name} onChange={e => setName(e.target.value)} />
          <input className="auth-input" type="email" id="email" placeholder="이메일" value={email} onChange={e => setEmail(e.target.value)} />
          <input className="auth-input" type="password" id="password" placeholder="비밀번호 (6자 이상)" value={password} onChange={e => setPassword(e.target.value)} />
          <input className="auth-input" type="password" id="passwordConfirm" placeholder="비밀번호 확인" value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} />
          <button className="btn btn-primary" id="btnSignup" style={{ width: '100%' }} onClick={handleSignup}>
            가입하기
          </button>
          <div
            className="auth-error"
            id="signupError"
            style={{ color: error.startsWith('✅') ? '#f28b50' : '#ff6b6b' }}
          >
            {error}
          </div>
        </div>
        <p className="auth-link">이미 계정이 있으신가요? <Link to="/login">로그인</Link></p>
      </div>
    </div>
  )
}

export default SignupPage
