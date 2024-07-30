import type { NextApiRequest, NextApiResponse } from "next";
import { openai } from "../../utils/openai";

type Body = {
  prompt: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body as Body;

  const prompt = generatePrompt(data);

  try {
    const response = await openai.chat.completions.create({
      model:"gpt-4o-mini",
      messages: [{ role: "user", content:prompt}],
      temperature: 0,
      max_tokens: 150,
      top_p: 1.0,
      presence_penalty: 0.0,
      frequency_penalty: 0.0,
      stop: [":"],
    });
    console.log('response', response)
    res.status(200).json({ result: response.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred', error });
  }
  
}

function generatePrompt(data: Body) {
  const prompt = `
  Generate a regular expression using the following requirements.
  Requirements: A regular expression for ${data.prompt}

  Result:
  `;
  return prompt;
}
