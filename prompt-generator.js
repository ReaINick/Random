const NAVADIVAS = 'aGZfb3N5WFNtaEtCSHpRZ3JEclF1WWNmWkNWcnlJVURHRGl3YQ=='; // Base64-encoded token

function Bob(JVON) {
    return atob(JVON); // Decode the Base64-encoded token
}

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

        // Check if the response is not OK (error handling)
        if (!response.ok) {
            const errorData = await response.json();
            console.error('API Error:', errorData);
            throw new Error(`Error ${response.status}: ${response.statusText} - ${errorData.error || 'Unknown error'}`);
        }

        // Parse the response data
        const data = await response.json();
        console.log('API Response:', data); // Log the entire API response for debugging

        // Display the generated prompt or handle empty responses
        if (data && data.generated_text) {
            document.getElementById('generated-prompt').textContent = data.generated_text;
        } else {
            document.getElementById('generated-prompt').textContent = 'No response generated. Please try again.';
        }
    } catch (error) {
        console.error('Error generating prompt:', error);
        document.getElementById('generated-prompt').textContent =
            `An error occurred while generating the prompt: ${error.message || 'Please try again later.'}`;
    }
}

// Attach event listener to the button
document.getElementById('generate-prompt-button').addEventListener('click', generatePrompt);
