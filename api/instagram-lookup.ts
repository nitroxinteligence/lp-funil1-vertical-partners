import axios from 'axios';
import OpenAI from 'openai';

export default async (req: any, res: any) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: 'Instagram username is required.' });
  }

  const rapidApiKey = process.env.RAPIDAPI_KEY;
  if (!rapidApiKey) {
    console.error('[API /instagram-lookup] FATAL: RAPIDAPI_KEY is not set in .env file');
    return res.status(500).json({ error: 'Server configuration error: Missing RapidAPI Key.' });
  }
  
  if (!process.env.OPENAI_API_KEY) {
    console.error('[API /instagram-lookup] FATAL: OPENAI_API_KEY is not set in .env file');
    return res.status(500).json({ error: 'Server configuration error: Missing OpenAI API Key.' });
  }

  try {
    // 1. Chamar a RapidAPI para buscar dados do perfil
    console.log(`[API /instagram-lookup] Calling RapidAPI for username: ${username}`);
    const options = {
      method: 'GET',
      url: 'https://instagram-looter2.p.rapidapi.com/profile2',
      params: { username },
      headers: {
        'X-RapidAPI-Key': rapidApiKey,
        'X-RapidAPI-Host': 'instagram-looter2.p.rapidapi.com'
      }
    };
    const response = await axios.request(options);
    const profileData = response.data;
    console.log('[API /instagram-lookup] Successfully fetched data from RapidAPI.');

    // 2. Chamar a OpenAI para gerar uma mensagem personalizada
    console.log('[API /instagram-lookup] Calling OpenAI to generate custom message...');
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const prompt = `
      Com base nos seguintes dados de um perfil do Instagram, crie uma mensagem de saudação curta (1-2 frases), amigável e personalizada para o usuário chamado ${profileData.full_name}. Mencione algo específico sobre a biografia dele.

      Dados do Perfil:
      - Nome Completo: ${profileData.full_name}
      - Username: ${profileData.username}
      - Biografia: ${profileData.biography}
      - Seguidores: ${profileData.follower_count}

      Exemplo de Mensagem: ${profileData.full_name}! Vimos que você é o fundador da Vertical Lex. Impressionante o que você está construindo para advogados!

      Mensagem:
    `;

    const openAIResponse = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
    });
    const customMessage = openAIResponse.choices[0].message.content || `Olá, ${profileData.full_name}!`;
    console.log('[API /instagram-lookup] Successfully generated custom message.');

    // 3. Retornar os dados combinados
    return res.status(200).json({
      profileData: {
        fullName: profileData.full_name,
        username: profileData.username,
        biography: profileData.biography,
        followers: profileData.follower_count,
        profilePicUrl: profileData.profile_pic_url,
      },
      customMessage,
    });

  } catch (error: any) {
    console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    console.error('[API /instagram-lookup] FATAL ERROR:');
    if (axios.isAxiosError(error)) {
      console.error('Axios Error Message:', error.message);
      if (error.response) {
        console.error('Response Status:', error.response.status);
        console.error('Response Data:', JSON.stringify(error.response.data, null, 2));
      }
    } else {
      console.error('Non-Axios Error:', error.message);
    }
    console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    return res.status(500).json({ error: 'Failed to fetch Instagram profile.' });
  }
};