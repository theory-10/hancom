const sendBtn = document.getElementById('sendBtn')
const userInput = document.getElementById('userInput')
const chatBox = document.getElementById('chatBox')

const addMessage = (text, role) => {
    const msg = document.createElement('div')

    msg.classList.add(role === 'user' ? 'user-msg' : 'ai-msg')
    msg.textContent = text 
    chatBox.appendChild(msg)

    chatBox.scrollTop = chatBox.scrollHeight
}

const sendMessage = async () => {
    const message = userInput.value.trim()
    if (!message) return

     addMessage(message, 'user')
    userInput.value = ''

    // 서버에 메시지 전송 후 AI 응답 받기
    const res = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
    })

    const data = await res.json()
    // AI 응답 화면에 표시
    addMessage(data.reply, 'ai')
}

// 전송 버튼 클릭 시 메시지 전송
sendBtn.addEventListener('click', sendMessage)

// Enter 키 입력 시 메시지 전송
userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendMessage()
})
