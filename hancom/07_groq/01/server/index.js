// .env 파일을 직접 읽어서 환경변수로 설정
const fs = require('fs')
const path = require('path')
const envPath = path.resolve(__dirname, '../../server/.env')
fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=["']?([^"'\n]*)["']?/)
    if (match) process.env[match[1].trim()] = match[2].trim()
})

// express: 서버 프레임워크, cors: 브라우저-서버 간 통신 허용
const express = require('express')
const cors = require('cors')

const app = express()

// 브라우저에서 서버로 요청 허용
app.use(cors())
// 요청 본문을 JSON 형식으로 파싱
app.use(express.json())

// 클라이언트로부터 채팅 메시지를 받아 Groq API에 전달하는 엔드포인트
app.post('/api/chat', async (req, res) => {
    // 클라이언트가 보낸 메시지 추출
    const { message } = req.body

    // Groq API 호출
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + process.env.FROQ_API_KEY
        },
        body: JSON.stringify({
            model: 'llama-3.1-8b-instant',
            messages: [{ role: 'user', content: message }]
        })
    })

    // Groq API 응답을 JSON으로 변환
    const data = await groqRes.json()
    console.log('Groq 응답:', JSON.stringify(data))
    console.log('API 키:', process.env.FROQ_API_KEY ? '로드됨' : '없음')

    // AI 답변을 클라이언트에 전달
    res.json({ reply: data.choices?.[0]?.message?.content || '응답 없음' })
})

// 3000번 포트에서 서버 실행
app.listen(3000, () => console.log('서버 실행 중: http://localhost:3000'))
