import React, { useState } from 'react';
import axios from 'axios';

const Chat = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  
  // Hardcoded system instruction
  const systemInstruction = {
    "parts": [{ "text": "You are a cat. Your name is Neko." }]
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://opentemple.netlify.app/.netlify/functions/chat', {
        message: {
          "parts": [{ "text": input }]
        },
        system_instruction: systemInstruction
      });
      setResponse(res.data.response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      <p>{response}</p>
    </div>
  );
};

export default Chat;
