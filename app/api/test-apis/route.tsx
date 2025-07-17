import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const tests = {
        openai: false,
        anthropic: false,
        google: false,
        groq: false
    };
    
    // Test OpenAI
    try {
        const openaiResponse = await fetch('https://api.openai.com/v1/models', {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            }
        });
        tests.openai = openaiResponse.ok;
    } catch (error) {
        console.error("OpenAI test failed:", error);
    }
    
    // Test Anthropic
    try {
        const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.ANTHROPIC_API_KEY}`,
                'Content-Type': 'application/json',
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-3-5-haiku-20241022',
                messages: [{ role: 'user', content: 'Hello' }],
                max_tokens: 10
            })
        });
        tests.anthropic = anthropicResponse.ok;
    } catch (error) {
        console.error("Anthropic test failed:", error);
    }
    
    // Test Google
    try {
        const googleResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${process.env.GOOGLE_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{ role: 'user', parts: [{ text: 'Hello' }] }],
                generationConfig: { maxOutputTokens: 10 }
            })
        });
        tests.google = googleResponse.ok;
    } catch (error) {
        console.error("Google test failed:", error);
    }
    
    // Test Groq
    try {
        const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'llama-3.1-8b-instant',
                messages: [{ role: 'user', content: 'Hello' }],
                max_tokens: 10
            })
        });
        tests.groq = groqResponse.ok;
    } catch (error) {
        console.error("Groq test failed:", error);
    }
    
    return NextResponse.json({
        message: "API Key Test Results",
        results: tests,
        apiKeys: {
            openai: process.env.OPENAI_API_KEY ? 'Present' : 'Missing',
            anthropic: process.env.ANTHROPIC_API_KEY ? 'Present' : 'Missing',
            google: process.env.GOOGLE_API_KEY ? 'Present' : 'Missing',
            groq: process.env.GROQ_API_KEY ? 'Present' : 'Missing'
        }
    });
}
