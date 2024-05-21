const axios = require('axios');
require('dotenv').config();

exports.handler = async (event) => {
  try {
    const { message } = JSON.parse(event.body);

    const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GOOGLE_API_KEY}`, {
      contents: [
        {
          parts: [{ text: message }]
        }
      ]
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
