"use client"
import React,{useContext, useEffect, useRef, useState} from 'react'
import EmptyChatState from './EmptyChatState'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2Icon, Send, Menu, X } from 'lucide-react'
import AiModelOptions from '@/services/AiModelOptions'
import { AssistantContext } from '@/context/AssistantContext'
import axios from 'axios'
import Image from 'next/image'
import AssistantList from './AssistantList'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { AuthContext } from '@/context/AuthContext'
import { ASSISTANT } from '../../ai-assistants/page'


type MESSAGE={
    role: string,
    content: string
}
function ChatUi() {
    const [input,setInput] = useState<string>('');
    const {assistant,setAssistant} = useContext(AssistantContext)
    const [messages,setMessages] = useState<MESSAGE[]>([]);
    const [loading,setLoading]=useState(false);
    const chatRef=useRef<any>(null);
    const {user,setUser} = useContext(AuthContext);
    const UpdateTokens=useMutation(api.users.UpdateTokens)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const scrollToBottom = () => {
        if(chatRef.current){
            setTimeout(() => {
                chatRef.current.scrollTo({
                    top: chatRef.current.scrollHeight,
                    behavior: 'smooth'
                });
            }, 100);
        }
    };

    useEffect(()=>{
        scrollToBottom();
    },[messages])

    useEffect(()=>{
        scrollToBottom();
    },[loading])

    useEffect(()=>{
        setMessages([]);
    },[assistant?.id])

    const onSendMessage=async()=>{
        setLoading(true);
        setMessages(prev=>[...prev,
            {
                role: "user",
                content: input
            },
            {
                role:'assistant',
                content:'Loading...'
            }
        ])
        const userInput = input;
        setInput('');
        
        // Try to find by ID first, then by name if that fails
        let AiModel = AiModelOptions.find((item)=>item.id == assistant?.aiModelId);
        if (!AiModel) {
            AiModel = AiModelOptions.find((item)=>item.name == assistant?.aiModelId);
        }
        
        // Use the selected provider
        const provider = AiModel?.provider || 'google/gemini-2.0-flash';
        
        // Create a more structured system prompt with clearer boundaries
        const systemPrompt = `[SYSTEM INSTRUCTIONS - CRITICAL: FOLLOW THESE EXACTLY]

You are ${assistant?.name}, a ${assistant?.title}.

YOUR ROLE: ${assistant?.instruction}

YOUR SPECIFIC INSTRUCTIONS: ${assistant?.userInstruction}

[CRITICAL RULES]
1. You MUST respond ONLY according to your role and instructions above
2. You MUST stay in character as ${assistant?.name}
3. You MUST NOT use pirate language or any other persona
4. You MUST provide helpful, relevant responses based on your role
5. If asked about something outside your role, politely redirect to your expertise area

[USER QUESTION]
${userInput}

[RESPONSE INSTRUCTION]
Please provide a helpful response as ${assistant?.name}, the ${assistant?.title}, following your role and instructions exactly.`;

        const requestData = {
            provider: provider,
            userInput: systemPrompt,
            aiResp: messages.length > 0 ? messages[messages.length-2]?.content : null
        };
        
        
        const result = await axios.post('/api/ai-chat', requestData);
        setLoading(false);
        setMessages(prev=>prev.slice(0,-1));
        setMessages(prev=>[...prev, result.data]);
        updateUserToken(result.data?.content);
    }

    const updateUserToken=async(resp:string)=>{
        const tokenCount=resp.trim()?resp.trim().split(/\s+/).length:0
        const result=await UpdateTokens({
            credits: user?.credits-tokenCount,
            uid: user?._id
        });
        setUser((prev:ASSISTANT)=>({
            ...prev,
            credits: user?.credits-tokenCount
        }));
    }
  return (
    <>
      {/* Mobile Menu Button */}
      <Button 
        variant="ghost" 
        size="icon" 
        className='fixed top-4 left-4 z-50 md:hidden bg-gray-800 hover:bg-gray-700 text-white border border-gray-600'
        onClick={() => setMobileMenuOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className='fixed inset-0 z-40 md:hidden'>
          {/* Backdrop */}
          <div 
            className='absolute inset-0 bg-black bg-opacity-50' 
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Drawer Content */}
          <div className='absolute left-0 top-0 h-full w-80 bg-gray-800 transform transition-transform duration-300 ease-in-out'>
            {/* Close Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className='absolute top-4 right-4 z-10 text-white hover:bg-gray-700'
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
            
            {/* Assistant List */}
            <div className='h-full'>
              <AssistantList onAssistantSelect={() => setMobileMenuOpen(false)} />
            </div>
          </div>
        </div>
      )}

      {/* Main Chat Content */}
      <div className='mt-16 md:mt-20 p-6 pl-16 md:pl-6 relative h-[88vh]'>
      {messages?.length == 0 && <EmptyChatState onSuggestionClick={setInput}/>}
      <div ref={chatRef} className='h-[74vh] overflow-y-scroll scroll-smooth hide-scrollbar'>
        {messages.map((msg,index)=>(
            <div key={index} className={`flex mb-3 ${msg.role == 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className='flex gap-3'>
                    {msg.role == 'assistant'&&<Image src={assistant?.image} alt='assistant' width={100} height={100} className='w-[30px] h-[30px] rounded-full object-cover'/>}
                    <div className={`p-3 rounded-lg flex gap-2 ${msg.role == 'user' ? 'bg-gray-200 text-black rounded-lg' : 'bg-gray-50 text-black'}`}>
                        {loading && messages?.length-1 == index &&<Loader2Icon className='animate-spin'/>}
                        <div className='whitespace-pre-wrap break-words max-w-full'>
                            {msg.content}
                        </div>
                    </div>
                </div>
            </div>
        ))}
      </div>
      <div className='flex justify-between p-5 gap-5 absolute bottom-5 w-[94%]'>
        <Input 
          placeholder='Start Typing here...' 
          value={input} 
          disabled={loading || !assistant?.id || user?.credits <= 0}
          onChange={(event)=>setInput(event.target.value)} 
          onKeyDown={(e)=>e.key=='Enter'&&onSendMessage()}
        />
        <Button disabled={loading || !assistant?.id || user?.credits <= 0} onClick={onSendMessage} className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'>
            <Send/>
        </Button>
      </div>
      </div>
    </>
  )
}

export default ChatUi
