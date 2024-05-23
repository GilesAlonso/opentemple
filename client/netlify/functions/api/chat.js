const axios = require('axios');
require('dotenv').config();

exports.handler = async (event) => {
  try {
    console.log('Event:', event); // Log the event for debugging
    const { message, system_instruction } = JSON.parse(event.body);

    const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${process.env.GOOGLE_API_KEY}`, {
      system_instruction,
      contents: [message]
    });

    const generatedText = response.data.candidates[0].content.parts[0].text;

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
