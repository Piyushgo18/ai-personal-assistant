import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const results = {
        openai: { status: 'untested', model: 'gpt-4o-mini', error: null as any },
        anthropic: { status: 'untested', model: 'claude-3-haiku-20240307', error: null as any },
        google: { status: 'untested', model: 'gemini-1.5-flash', error: null as any },
        groq: { status: 'untested', model: 'llama-3.1-8b-instant', error: null as any }
    };
    
    // Test OpenAI
    try {
        const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [{ role: 'user', content: 'Say hello' }],
                max_tokens: 10
            })
        });
        
        if (openaiResponse.ok) {
            results.openai.status = 'success';
        } else {
            const errorData = await openaiResponse.json();
            results.openai.status = 'failed';
            results.openai.error = errorData;
        }
    } catch (error) {
        results.openai.status = 'failed';
        results.openai.error = error instanceof Error ? error.message : String(error);
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
                model: 'claude-3-haiku-20240307',
                messages: [{ role: 'user', content: 'Say hello' }],
                max_tokens: 10
            })
        });
        
        if (anthropicResponse.ok) {
            results.anthropic.status = 'success';
        } else {
            const errorData = await anthropicResponse.json();
            results.anthropic.status = 'failed';
            results.anthropic.error = errorData;
        }
    } catch (error) {
        results.anthropic.status = 'failed';
        results.anthropic.error = error instanceof Error ? error.message : String(error);
    }
    
    // Test Google Gemini
    try {
        const googleResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GOOGLE_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{ role: 'user', parts: [{ text: 'Say hello' }] }],
                generationConfig: { maxOutputTokens: 10 }
            })
        });
        
        if (googleResponse.ok) {
            results.google.status = 'success';
        } else {
            const errorData = await googleResponse.json();
            results.google.status = 'failed';
            results.google.error = errorData;
        }
    } catch (error) {
        results.google.status = 'failed';
        results.google.error = error instanceof Error ? error.message : String(error);
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
                messages: [{ role: 'user', content: 'Say hello' }],
                max_tokens: 10
            })
        });
        
        if (groqResponse.ok) {
            results.groq.status = 'success';
        } else {
            const errorData = await groqResponse.json();
            results.groq.status = 'failed';
            results.groq.error = errorData;
        }
    } catch (error) {
        results.groq.status = 'failed';
        results.groq.error = error instanceof Error ? error.message : String(error);
    }
    
    return NextResponse.json({
        message: "Model Testing Results",
        results,
        summary: {
            working: Object.values(results).filter(r => r.status === 'success').length,
            failed: Object.values(results).filter(r => r.status === 'failed').length
        }
    });
}
