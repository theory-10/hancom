const sendBtn = document.getElementById('sendBtn')
const userInput = document.getElementById('userInput')
const chatBox = document.getElementById('chatBox')

// 메시지를 채팅창에 추가하는 함수
const addMessage = (text, role) => {
    // 첫 메시지 시 환영 문구 제거
    const welcome = chatBox.querySelector('.welcome')
    if (welcome) welcome.remove()

    const message = document.createElement('div')
    message.classList.add('message', role === 'user' ? 'user-message' : 'ai-message')

    if (role === 'ai') {
        const sender = document.createElement('div')
        sender.classList.add('sender')
        sender.textContent = 'Groq AI'
        message.appendChild(sender)
    }

    const bubble = document.createElement('div')
    bubble.classList.add('bubble')
    bubble.textContent = text
    message.appendChild(bubble)

    chatBox.appendChild(message)
    chatBox.scrollTop = chatBox.scrollHeight
}

// 메시지 전송 함수
const sendMessage = async () => {
    const message = userInput.value.trim()
    if (!message) return

    addMessage(message, 'user')
    userInput.value = ''
    userInput.style.height = 'auto'
    sendBtn.disabled = true

    try {
        const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        })
        const data = await res.json()
        addMessage(data.reply, 'ai')
    } catch (err) {
        addMessage('서버 연결에 실패했습니다.', 'ai')
    } finally {
        sendBtn.disabled = false
        userInput.focus()
    }
}

// 새 대화 시작
const clearChat = () => {
    chatBox.innerHTML = '<div class="welcome"><h1>무엇을 도와드릴까요?</h1></div>'
}

// textarea 자동 높이 조절
userInput.addEventListener('input', () => {
    userInput.style.height = 'auto'
    userInput.style.height = userInput.scrollHeight + 'px'
})

// 전송 버튼 클릭
sendBtn.addEventListener('click', sendMessage)

// Enter 키로 전송 (Shift+Enter는 줄바꿈)
userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        sendMessage()
    }
})
