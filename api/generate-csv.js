const { Configuration, OpenAIApi } = require("openai");

module.exports = async (req, res) => {
    // Parse the incoming request
    const { prompt } = req.body;

    // Initialize the OpenAI API
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    try {
        // Call the OpenAI API
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 100,
        });

        // Format the response as CSV
        const csvContent = "data:text/csv;charset=utf-8," + completion.data.choices[0].text.trim();

        // Return the CSV content
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="synthetic-data.csv"');
        res.send(csvContent);
    } catch (error) {
        console.error('OpenAI API error:', error);
        res.status(500).send('Failed to generate CSV');
    }
};
