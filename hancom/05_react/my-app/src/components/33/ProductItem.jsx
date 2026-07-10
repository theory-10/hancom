import { useState } from "react"

const ProductItem = ({ name }) => {
    const [ count, setCount] = useState(0)
    return (
        <div style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '20px', width: '200px',
            textAlign: 'center'
        }}>
            <div className="product">
                <h3>{name}</h3>
                <p>{count}개 담음</p>
            </div>
            <button onClick={() => setCount(c => c + 1)}>🛒 담기</button>
        </div>
    )
}

export default ProductItem