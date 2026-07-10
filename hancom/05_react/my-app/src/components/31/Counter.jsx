import { useState } from 'react'

const Counter = () => {
  const [count, setCount] = useState(0)
  return (
    <>
      <button onClick={() => setCount(c => c - 1)}>−1</button>
      <span>{count}</span>
      <button onClick={() => setCount(c => c + 1)}>+1</button>
      <button onClick={() => setCount(0)}>리셋</button>   {/* 초기값 0으로 */}
    </>
  )
}
export default Counter