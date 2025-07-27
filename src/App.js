import React, { useState } from 'react';
import StartPage from './StartPage';
import ChatPage from './ChatPage';

export default function App() {
  const [username, setUsername] = useState('');

  return username ? (
    <ChatPage username={username} />
  ) : (
    <StartPage onStart={setUsername} />
  );
}