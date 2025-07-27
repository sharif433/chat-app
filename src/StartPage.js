import React, { useState } from 'react';

export default function StartPage({ onStart }) {
  const [name, setName] = useState('');

  const handleStart = () => {
    if (name.trim()) onStart(name.trim());
  };

  return (
    <div className="start-page">
      <h1>Welcome to Chat App</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleStart}>Start Chat</button>
    </div>
  );
}