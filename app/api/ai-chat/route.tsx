import { NextRequest, NextResponse } from "next/server";

// Helper function to format AI responses
function formatAIResponse(content: string): string {
    return content
        .trim()
        .replace(/\n\s*\n/g, '\n\n') // Normalize multiple newlines
        .replace(/^\s+/gm, '') // Remove leading whitespace from lines
        .replace(/\s+$/gm, ''); // Remove trailing whitespace from lines
}

export async function POST(req: NextRequest) {
    const { provider, userInput, aiResp } = await req.json();
    
    try {
        let response;
        
        switch (provider) {
            case 'google/gemini-2.0-flash':
                response = await callGemini(userInput, aiResp);
                break;
            case 'groq/llama':
                response = await callGroq(userInput, aiResp);
                break;
            default:
                response = await callGroq(userInput, aiResp); // Default to Groq (free and fast)
        }
        
        return NextResponse.json({
            role: "assistant",
            content: formatAIResponse(response)
        });
        
    } catch (error) {
        console.error("AI API Error:", error);
        
        // Provide more specific error messages
        let errorMessage = "I'm currently experiencing technical difficulties. Please try again later.";
        
        if (error instanceof Error) {
            if (error.message.includes('Google')) {
                errorMessage = "There's an issue with the Google Gemini service. Please try the Groq model or try again later.";
            } else if (error.message.includes('Groq')) {
                errorMessage = "There's an issue with the Groq service. Please try the Google Gemini model or try again later.";
            }
        }
        
        return NextResponse.json({
            role: "assistant",
            content: errorMessage
        }, { status: 500 });
    }
}

// Google Gemini API Call
async function callGemini(userInput: string, aiResp?: string) {
    const messages = [
        {
            role: "user",
            parts: [{ text: userInput }]
        }
    ];
    
    // Add previous AI response if exists
    if (aiResp && aiResp !== 'Loading...') {
        messages.unshift({
            role: "model",
            parts: [{ text: aiResp }]
        });
    }
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GOOGLE_API_KEY}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contents: messages,
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 1000
            }
        })
    });
    
    if (!response.ok) {
        const errorData = await response.json();
        console.error("Google Gemini API Error:", errorData);
        throw new Error(`Google Gemini API Error: ${errorData.error?.message || 'Unknown error'}`);
    }
    
    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0]) {
        console.error("Invalid Gemini response structure:", data);
        throw new Error("Invalid response structure from Google Gemini");
    }
    
    return data.candidates[0].content.parts[0].text;
}

// Groq API Call (Free and Fast)
async function callGroq(userInput: string, aiResp?: string) {
    const messages = [
        {
            role: "system",
            content: "You are a helpful AI assistant. Follow the user's instructions exactly and stay in character as described. Format your responses with proper line breaks and structure."
        },
        {
            role: "user",
            content: userInput
        }
    ];
    
    // Add previous AI response if exists
    if (aiResp && aiResp !== 'Loading...') {
        messages.splice(1, 0, {
            role: "assistant",
            content: aiResp
        });
    }
    
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'llama-3.1-8b-instant',
            messages: messages,
            temperature: 0.7,
            max_tokens: 1000
        })
    });
    
    if (!response.ok) {
        const errorData = await response.json();
        console.error("Groq API Error:", errorData);
        throw new Error(`Groq API Error: ${errorData.error?.message || 'Unknown error'}`);
    }
    
    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        console.error("Invalid Groq response structure:", data);
        throw new Error("Invalid response structure from Groq");
    }
    
    return data.choices[0].message.content;
}
