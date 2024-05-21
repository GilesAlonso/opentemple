const axios = require('axios');

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
      body: JSON.stringify({ response: generatedText })
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' })
    };
  }
};
