// Content.jsx
import { useState } from 'react'

const Content = () => {
    const [message, setMessage] = useState('')

    const handleClick = () => {
        setMessage('버튼을 클릭했어요')
    }

    return (
        <main style={{ minHeight: '400px', padding: '20px', backgroundColor: '#f5f5f5' }}> 메인 컨텐츠
        <br></br>
         <button onClick = {handleClick}>클릭하세요</button>
         <p>{message}</p>
        </main>
       

    )
}

export default Content