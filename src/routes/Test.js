import { useState } from 'react';

const Test = () => {
  const [text, setText] = useState('')
  const [list, setList] = useState([])

  const handleInput = (e) => {
    setText(e.target.value)
  }
  const handleButton = (e) => {
    setList([...list, text])
  }

  return (
    <div style={{margin: '20px', border: '1px solid #ccc'}}>
      <input type="text" onChange={handleInput} />
      <input type="button" value="등록" onClick={handleButton} />
      {list.map((item, idx) => <p key={idx}>{item}</p>)}
    </div>
  );
}

export default Test;