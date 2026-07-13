import { useState, useEffect } from 'react'

const STORAGE_KEY = 'travelChecklist'

const load = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
const save = (items) => localStorage.setItem(STORAGE_KEY, JSON.stringify(items))

function ChecklistPage() {
  const [items, setItems] = useState([])
  const [input, setInput] = useState('')

  useEffect(() => { setItems(load()) }, [])

  const render = (updated) => { setItems(updated); save(updated) }

  const addItem = () => {
    const text = input.trim()
    if (!text) return
    const updated = [...items, { text, done: false }]
    render(updated)
    setInput('')
  }

  const toggleItem = (idx) => {
    const updated = [...items]
    updated[idx] = { ...updated[idx], done: !updated[idx].done }
    render(updated)
  }

  const deleteItem = (idx) => {
    const updated = items.filter((_, i) => i !== idx)
    render(updated)
  }

  return (
    <div className="container">
      <h2 className="page-title">준비물 체크리스트</h2>

      <div className="form-group">
        <input
          type="text"
          id="newItem"
          placeholder="준비물 입력"
          style={{ flex: 1 }}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') addItem() }}
        />
        <button className="btn btn-primary" id="btnAdd" onClick={addItem}>추가</button>
      </div>

      <div id="checkList">
        {items.map((item, idx) => (
          <div key={idx} className="check-item">
            <input
              type="checkbox"
              id={`chk${idx}`}
              checked={item.done}
              onChange={() => toggleItem(idx)}
            />
            <label htmlFor={`chk${idx}`} className={item.done ? 'done' : ''}>
              {item.text}
            </label>
            <button className="btn btn-danger" onClick={() => deleteItem(idx)}>삭제</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChecklistPage
