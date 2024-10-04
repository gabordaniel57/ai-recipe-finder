import axios from 'axios';
import { Message } from '../typescript/recipe';

export const fetchRecipes = async (messages: Message[] = []): Promise<any> => {
  const response = await axios.post(
    'https://api.groq.com/openai/v1/chat/completions',
    {
      model: 'llama3-8b-8192',
      messages,
      temperature: 1,
      max_tokens: 4024,
      top_p: 1,
      stream: false,
      response_format: {
        type: 'json_object',
      },
      stop: null,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`, // Use the API key for Groq from .env
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data;
};
