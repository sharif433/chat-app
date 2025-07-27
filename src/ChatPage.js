import React, { useEffect, useRef, useState } from 'react';

const initialMessages = [
  { from: 'bot', text: 'Hi there! How can I help you today?' },
  { from: 'bot', text: 'This is a demo chat app.' }
];

export default function ChatPage({ username }) {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const ws = useRef(null);
  const chatRef = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket('wss://echo.websocket.org'); // public echo server
    ws.current.onmessage = (event) => {
      setMessages((msgs) => [...msgs, { from: 'bot', text: event.data }]);
    };
    return () => ws.current.close();
  }, []);

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (input.trim() !== '') {
      const msg = { from: 'user', text: input.trim() };
      setMessages((msgs) => [...msgs, msg]);
      ws.current.send(input.trim());
      setInput('');
    }
  };

  return (
    <div className="chat-page">
      <h2>Hello, {username} 👋</h2>
      <div className="chat-box">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`message ${msg.from === 'user' ? 'user' : 'bot'}`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={chatRef}></div>
      </div>
      <div className="input-box">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}