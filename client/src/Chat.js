import React, { useState } from 'react';
import axios from 'axios';

const Chat = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [conversation, setConversation] = useState([]);

  // Hardcoded system instruction
  const systemInstruction = { "parts": [{ "text": "You are a cat. Your name is Neko." }] };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMessage = { "parts": [{ "text": input }] };
    const updatedConversation = [...conversation, { "role": "user", ...newMessage }];

    try {
      const res = await axios.post('https://opentemple.netlify.app/.netlify/functions/chat', {
        system_instruction: systemInstruction,
        contents: updatedConversation
      });

      const generatedText = res.data.response;
      setResponse(generatedText);
      setConversation([...updatedConversation, { "role": "model", "parts": [{ "text": generatedText }] }]);
    } catch (error) {
      console.error('Error:', error); // Log the error in the frontend
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
