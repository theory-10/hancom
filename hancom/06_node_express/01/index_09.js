const express = require('express') // 1.꺼내기
const cors = require('cors') // .미들에서 써내기
const app = express() // 2. 서버 만들기

// 3. 규칙 만들기
app.use(cors()) // 다른 포트 허용 및 규제
app.use(express.json()) // 객체로 해석 =>
                        // 변환 전: "{\"name\":\"민수"}"
                        // 변환 후: {name: "민수"}
app.use((req, res, next) => {
    console.log(req.method, req.url) // 모든 요청 로그 남기기
    next()
})

// 4. 문열기
app.get('/api/users', (req, res) => res.json([{ id:1, name: 'PARK' }]))

app.listen(3000, () => console.log('http://localhost:3000/api/users'))