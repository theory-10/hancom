const express = require('express')
const app = express()

app.use(express.json())

app.post('/api/chat', (req, res) => {
    const { message } = req.body
    console.log(message)
    res.json({ ok: true, 받은문장: message })
})

app.listen(3000, () => console.log('http://localhost:3000'))