const API_KEY = "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";

// Function to query the Hugging Face API
async function query(input) {
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
  return result[0].generated_text;
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
      const enhancedPrompt = await generateEnhancedPrompt(userInput);
      generatedPromptDisplay.textContent = enhancedPrompt;
      generateButton.disabled = false;
      generateButton.textContent = 'Magicify';
    } else {
      alert('Please enter a topic or idea first!');
    }
  });
});
