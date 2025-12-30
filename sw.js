// Locate this block in your index.html
const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        // PASTE YOUR KEY BELOW REPLACE THE TEXT AFTER 'Bearer '
        "Authorization": "Bearer YOUR_GROQ_API_KEY" 
    },
    // ... rest of the code