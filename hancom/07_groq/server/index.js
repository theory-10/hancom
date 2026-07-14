require('dotenv').config({ path: '../../.env' })

const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.post('/api/chat', async (req, res) => {
    const { message } = req.body

    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + process.env.FROQ_API_KEY
        },
        body: JSON.stringify({
            model:'llama-3.1-8b-instant',
            messages: [{ role: 'user', content: message }]
        })
    })

    const data = await groqRes.json()
    res.json({ reply: data.choices?.[0]?.message?.content || '응답 없음' })
})

app.listen(3000, () => console.log('서버 실행 중: http://localhost:3000'))