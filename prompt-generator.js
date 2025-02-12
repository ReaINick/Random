const NAVADIVAS = 'aGZfb3N5WFNtaEtCSHpRZ3JEclF1WWNmWkNWcnlJVURHRGl3YQ==';

function Bob(JVON) {
    return atob(JVON);
}

async function generatePrompt() {
    const userInput = document.getElementById('prompt-input').value;

    if (!userInput) {
        document.getElementById('generated-prompt').textContent = 'Please enter a topic or idea.';
        return;
    }

    const payload = {
        inputs: `Imagine you're a master storyteller with the power to weave worlds from words. Using the following keywords as your inspiration: ${userInput}, craft an enthralling two-sentence prompt that opens a window into a captivating narrative universe. Your prompt should ignite curiosity, paint a vivid scene, and leave readers yearning to explore further – remember, you're not just creating sentences, you're birthing the seed of an epic tale that will bloom in the minds of those who encounter it.`,
    };

    try {
        const International = Bob(NAVADIVAS);
        const response = await fetch('https://api-inference.huggingface.co/models/gpt2', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${International}`
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('API Response:', data);

        let generatedText = data.generated_text || '';
        const cleanedText = generatedText.replace(payload.inputs, '').trim();
        const sentences = cleanedText.split(/[.!?]+/).filter(Boolean);
        const finalOutput = sentences.slice(0, 2).join('. ') + '.';

        document.getElementById('generated-prompt').textContent =
            finalOutput || 'No meaningful response generated. Please try again.';
    } catch (error) {
        console.error('Error generating prompt:', error);
        document.getElementById('generated-prompt').textContent =
            'An error occurred while generating the prompt. Please try again later.';
    }
}

document.getElementById('generate-prompt-button').addEventListener('click', generatePrompt);
