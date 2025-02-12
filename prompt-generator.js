
const API_KEY = "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";


async function query(input, retryCount = 3) {
    try {
        console.log(`Attempting API call with retryCount: ${retryCount}`);

        const response = await fetch(
            "https://api-inference.huggingface.co/models/zamal/gemma-7b-finetuned",
            {
                headers: { Authorization: `Bearer ${API_KEY}` },
                method: "POST",
                body: JSON.stringify({
                    inputs: input,
                    parameters: { max_length: 100, temperature: 0.7 }
                }),
            }
        );

        const result = await response.json();
        console.log("API Response:", result); // Log the API response for debugging

        // Handle "model loading" error
        if (result.error && result.error.includes("currently loading")) {
            const estimatedTime = result.estimated_time || 60; // Default to 60 seconds if no estimate is provided
            console.log(`Model is loading. Waiting for ${Math.ceil(estimatedTime)} seconds before retrying...`);
            await new Promise(resolve => setTimeout(resolve, Math.ceil(estimatedTime) * 1000));
            return query(input, retryCount - 1); // Retry after waiting
        }

        // Check if the API returns an error object
        if (result.error) {
            throw new Error(`API Error: ${result.error}`);
        }

        // Adjust this line based on the actual structure of the API response
        const generatedText = result[0]?.generated_text;
        if (!generatedText) {
            throw new Error("API did not return 'generated_text'");
        }

        return generatedText;
    } catch (error) {
        console.error("Error during API call:", error);
        throw error; // Re-throw the error so it can be caught by the calling function
    }
}

// Function to generate enhanced prompt
async function generateEnhancedPrompt(userInput) {
    const instruction = `Imagine you're a master storyteller with the power to weave worlds from words. Using the following keywords as your inspiration: ${userInput}, craft an enthralling two-sentence prompt that opens a window into a captivating narrative universe. Your prompt should ignite curiosity, paint a vivid scene, and leave readers yearning to explore further – remember, you're not just creating sentences, you're birthing the seed of an epic tale that will bloom in the minds of those who encounter it.`;

    try {
        const enhancedPrompt = await query(instruction);
        return enhancedPrompt.trim();
    } catch (error) {
        console.error("Error generating prompt:", error);
        return "An error occurred while generating the prompt. Please try again.";
    }
}

// Event listener for the generate prompt button
document.addEventListener('DOMContentLoaded', () => {
    const generateButton = document.getElementById('generate-prompt-button');
    const promptInput = document.getElementById('prompt-input');
    const generatedPromptDisplay = document.getElementById('generated-prompt');

    generateButton.addEventListener('click', async () => {
        const userInput = promptInput.value.trim();
        if (userInput) {
            generateButton.disabled = true;
            generateButton.textContent = 'Generating...';
            try {
                const enhancedPrompt = await generateEnhancedPrompt(userInput);
                generatedPromptDisplay.textContent = enhancedPrompt;
            } catch (error) {
                generatedPromptDisplay.textContent = "An error occurred. Please check the console.";
            } finally {
                generateButton.disabled = false;
                generateButton.textContent = 'Magicify';
            }
        } else {
            alert('Please enter a topic or idea first!');
        }
    });
});
