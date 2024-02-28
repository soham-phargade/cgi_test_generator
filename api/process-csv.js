// Import the necessary OpenAI SDK components
const { Configuration, OpenAIApi } = require("openai");

// The main function that handles incoming requests
module.exports = async (req, res) => {
    // Ensure we're dealing with a POST request
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }

    // Initialize OpenAI configuration with your API key
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY, // Make sure to set this in your Vercel project settings
    });
    const openai = new OpenAIApi(configuration);

    // Example prompt; you might customize this based on actual input from the frontend
    const prompt = `Generate a CSV file with 100 rows of synthetic data. The CSV should have the same headings as the input file. Ensure each row contains fictional but plausible data for each column.`;

    try {
        // Call the OpenAI API with the prompt
        const response = await openai.createCompletion({
            model: "text-davinci-003", // Adjust model as necessary
            prompt: prompt,
            max_tokens: 1024,
            temperature: 0.7,
        });

        // Send the generated text (CSV content) back to the client
        res.status(200).send(response.data.choices[0].text);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send('Internal Server Error');
    }
};
