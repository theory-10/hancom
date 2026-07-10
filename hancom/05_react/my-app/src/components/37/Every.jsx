import { useState, useEffect } from "react"

const Every = () => {
    const [count, setCount] = useState(0)

    useEffect(() => {
    console.log(' 실행')
}, [])

  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}

export default Every