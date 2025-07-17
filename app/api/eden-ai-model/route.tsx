import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const {provider, userInput, aiResp} = await req.json();
    
    console.log("Received provider:", provider);
    console.log("Received userInput:", userInput);
    console.log("Received aiResp:", aiResp);
    
  const headers = {
    Authorization: "Bearer " + process.env.EDEN_AI_API_KEY,
    'Content-Type': 'application/json'
  };
  const url = "https://api.edenai.run/v2/multimodal/chat";
  
  // Create messages array with system prompt
  const messages = [
    {
        "role": "user",
        "content": [
            {
                "type": "text",
                "content": {
                    "text": userInput
                }
            }
        ]
    }
  ];
  
  // Add previous AI response if exists
  if (aiResp && aiResp !== 'Loading...') {
    messages.unshift({
        "role": "assistant",
        "content": [
            {
                "type": "text",
                "content": {
                    "text": aiResp
                }
            }
        ]
    });
  }
  
  const body = JSON.stringify({
    providers: provider,
    messages: messages,
    temperature: 0.7,
    max_tokens: 1000
  });

  console.log("Request body:", body);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body
    });

    const result = await response.json();
    console.log("Eden AI Full Response:", JSON.stringify(result, null, 2));
    
    // Check if the response has the expected structure
    if (result[provider] && result[provider].generated_text) {
      console.log("Generated text:", result[provider].generated_text);
      const resp = {
        role: "assistant",
        content: result[provider].generated_text
      };
      return NextResponse.json(resp);
    } else {
      console.error("Unexpected response structure:", result);
      console.error("Available providers in response:", Object.keys(result));
      
      // Try to find any available response
      const availableProviders = Object.keys(result);
      for (const availableProvider of availableProviders) {
        if (result[availableProvider] && result[availableProvider].generated_text) {
          console.log("Using fallback provider:", availableProvider);
          const resp = {
            role: "assistant",
            content: result[availableProvider].generated_text
          };
          return NextResponse.json(resp);
        }
      }
      
      return NextResponse.json({
        role: "assistant",
        content: "I apologize, but I'm having trouble processing your request. Please try again."
      }, { status: 500 });
    }
  } catch (error) {
    console.error("Eden AI API Error:", error);
    return NextResponse.json({
      role: "assistant",
      content: "I'm currently experiencing technical difficulties. Please try again later."
    }, { status: 500 });
  }
}