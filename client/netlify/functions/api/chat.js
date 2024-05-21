const axios = require('axios');
require('dotenv').config();

let conversationHistory = ''; // Initialize conversation history

exports.handler = async (event) => {
  try {
    const { message } = JSON.parse(event.body);

    // Append the current message to the conversation history
    conversationHistory += `\n${message}`;

    const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.YOUR_API_KEY}`, {
      contents: [
        {
          role: 'user',
          parts: [{ text: conversationHistory }] // Include conversation history in the request
        }
      ]
    });

    const generatedText = response.data.candidates[0].content.parts[0].text;

    // Update the conversation history with the generated text
    conversationHistory += `\n${generatedText}`;

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ response: generatedText })
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ error: 'Internal Server Error' })
    };
  }
};
