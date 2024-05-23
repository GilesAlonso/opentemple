const axios = require('axios');
require('dotenv').config();

exports.handler = async (event) => {
  try {
    console.log('Event:', event); // Log the event for debugging
    const { system_instruction, contents } = JSON.parse(event.body);
    console.log('System instruction:', system_instruction); // Log the system instruction
    console.log('Contents:', contents); // Log the conversation contents

    const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${process.env.YOUR_API_KEY}`, {
      system_instruction,
      contents
    });

    console.log('API response:', response.data); // Log the API response

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
    console.error('Error:', error); // Log the error
    console.error('Error response:', error.response ? error.response.data : 'No response data'); // Log the error response data if available

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
