async function generatePrompt() {
    const userInput = document.getElementById('prompt-input').value;

    // Check if user entered any input
    if (!userInput) {
        document.getElementById('generated-prompt').textContent = 'Please enter a topic or idea.';
        return;
    }

    // Prepare the payload for Hugging Face's Inference API
    const payload = {
        inputs: `Generate a creative two-sentence prompt based on this topic: ${userInput}. Make it imaginative and thought-provoking.`,
    };

    try {
        // Decode the token before making the API request
        const International = Bob(NAVADIVAS);

        // Call Hugging Face's GPT-2 model (free API)
        const response = await fetch('https://api-inference.huggingface.co/models/gpt2', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${International}` // Use the decoded token here
            },
            body: JSON.stringify(payload),
        });

        // Handle errors from the API
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('API Response:', data); // Log full API response for debugging

        // Extract and clean up generated text
        let generatedText = data.generated_text || '';

        // Remove any part of the response that echoes back our input prompt
        const cleanedText = generatedText.replace(payload.inputs, '').trim();

        // Split into sentences and extract only the first two
        const sentences = cleanedText.split(/[.!?]+/).filter(Boolean);
        const finalOutput = sentences.slice(0, 2).join('. ') + '.';

        // Display the cleaned-up and parsed output in HTML
        document.getElementById('generated-prompt').textContent =
            finalOutput || 'No meaningful response generated. Please try again.';
    } catch (error) {
        console.error('Error generating prompt:', error);
        document.getElementById('generated-prompt').textContent =
            'An error occurred while generating the prompt. Please try again later.';
    }
}

// Attach event listener to the button
document.getElementById('generate-prompt-button').addEventListener('click', generatePrompt);
