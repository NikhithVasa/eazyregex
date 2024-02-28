import OpenAI from 'openai';

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

