export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { image } = req.body;
  
  // This pulls your key from Vercel's private Environment Variables
  const apiKey = process.env.GROQ_API_KEY; 

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "llama-3.2-11b-vision-preview",
        messages: [{
          role: "user",
          content: [
            { 
              type: "text", 
              text: "Find the price in this image. Respond with ONLY the numerical value (e.g., 4.50). If you are unsure or no price exists, respond with 0." 
            },
            { 
              type: "image_url", 
              image_url: { url: `data:image/jpeg;base64,${image}` } 
            }
          ]
        }],
        temperature: 0.1 // Keeps the AI from being 'creative' with numbers
      })
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to connect to Groq" });
  }
}