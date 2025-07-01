import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001');

function App() {
  const [text, setText] = useState('');

  useEffect(() => {
    socket.on('receive-text', (data) => {
      setText(data);
    });
  }, []);

  const handleChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    socket.emit('send-text', newText);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Real-Time Collaborative Editor</h2>
      <textarea
        value={text}
        onChange={handleChange}
        rows="10"
        cols="50"
        placeholder="Start typing..."
      />
    </div>
  );
}

export default App;
