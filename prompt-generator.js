// Function to generate a creative prompt using Hugging Face's GPT-2 model
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
        // Call Hugging Face's GPT-2 model (free API)
        const response = await fetch('https://api-inference.huggingface.co/models/gpt2', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        // Handle errors from the API
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        // Display the generated prompt
        document.getElementById('generated-prompt').textContent =
            data.generated_text || 'No response generated. Try again.';
    } catch (error) {
        console.error('Error generating prompt:', error);
        document.getElementById('generated-prompt').textContent =
            'An error occurred while generating the prompt. Please try again later.';
    }
}

// Attach event listener to the button
document.getElementById('generate-prompt-button').addEventListener('click', generatePrompt);
