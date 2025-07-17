"use client"
import { Button } from '@/components/ui/button'
import AiAssistantsList from '@/services/AiAssistantsList'
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { Checkbox } from '@/components/ui/checkbox'
import { BlurFade } from '@/components/magicui/blur-fade'
import { RainbowButton } from '@/components/magicui/rainbow-button'
import { useConvex, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { AuthContext } from '@/context/AuthContext'
import { select } from 'motion/react-client'
import { Loader2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'

export type ASSISTANT={
  id: number,
        name: string,
        title: string,
        image: string,
        instruction: string,
        userInstruction: string,
        sampleQuestions: string[],
        aiModelId?: string
}

function AIAssistants() {
  const [selectedAssistants, setSelectedAssistants] = useState<ASSISTANT[]>([]);
  const insertAssistant=useMutation(api.userAiAssistants.InsertSelectedAssistants);
  const {user}=useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const convex = useConvex();
  const router = useRouter();

  useEffect(()=>{
    user && GetUserAssistants();
  }, [user]);

  const GetUserAssistants=async()=>{
    const result = await convex.query(api.userAiAssistants.GetAllUserAssistants, {
      uid: user._id
    });
    if(result.length>0){
      router.replace('/workspace')
      return;
    }
  }

  const onSelect=(assistant:ASSISTANT) => {
    const item=selectedAssistants.find((item:ASSISTANT)=>item.id == assistant.id);
    if(item){
      setSelectedAssistants(selectedAssistants.filter((item:ASSISTANT)=>item.id !== assistant.id));
      return;
    }
    setSelectedAssistants(prev=>[...prev, assistant]);
  }

  const IsAssistantSelected=(assistant:ASSISTANT) => {
    const item=selectedAssistants.find((item:ASSISTANT)=>item.id == assistant.id);
    return item?true:false;
  }

  const onClickContinue=async() => {
    if(!user?._id) {
      console.error("User ID is missing");
      return;
    }
    
    setLoading(true);
    try {
      const result = await insertAssistant({
        records: selectedAssistants,
        uid: user._id
      })
      setLoading(false);
      router.replace('/workspace');
    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <div className='min-h-screen bg-gray-900 text-white relative overflow-hidden'>
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        {/* Neural Network Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-gray-900/20"></div>
        
        {/* Circuit Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 800 600">
            <defs>
              <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M0,50 L20,50 L30,40 L40,40 L50,30 L60,30 L70,40 L80,40 L100,50" stroke="#3B82F6" strokeWidth="1" fill="none" opacity="0.3"/>
                <path d="M50,0 L50,20 L40,30 L40,40 L30,50 L30,60 L40,70 L40,80 L50,100" stroke="#8B5CF6" strokeWidth="1" fill="none" opacity="0.3"/>
                <circle cx="50" cy="50" r="3" fill="#3B82F6" opacity="0.5"/>
                <circle cx="30" cy="30" r="2" fill="#8B5CF6" opacity="0.5"/>
                <circle cx="70" cy="70" r="2" fill="#10B981" opacity="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit)"/>
          </svg>
        </div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className='px-10 mt-20 md:px-28 lg:px-36 xl:px-48 relative z-20'>
        <div className='flex justify-between items-center'>
          <div>
            <BlurFade delay={0.25} inView>
              <h2 className='text-3xl font-bold'>
                Welcome to the World of 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"> AI Assistants</span> 🤖
              </h2>
            </BlurFade>
            <BlurFade delay={0.25 * 2} inView>
              <p className='text-xl mt-2 text-gray-300'>Choose your AI Companion to Simplify your Task 🚀</p>
            </BlurFade>
          </div>
          <RainbowButton 
            disabled={selectedAssistants?.length==0 || loading} 
            onClick={onClickContinue}
            className="shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
          >
            {loading&&<Loader2Icon className='animate-spin'/> }Continue
          </RainbowButton>
        </div>
        
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5 mb-5'>
          {AiAssistantsList.map((assistant, index) => (
            <BlurFade key={assistant.image} delay={0.25 + index * 0.05} inView>
              <div 
                key={index} 
                className='bg-gray-800/80 backdrop-blur-sm border border-gray-700 hover:border-blue-500 p-4 rounded-xl hover:scale-105 transition-all duration-300 cursor-pointer relative shadow-lg hover:shadow-2xl' 
                onClick={()=>onSelect(assistant)}
              >
                <Checkbox 
                  className='absolute m-2 z-10 bg-gray-700 border-gray-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600' 
                  checked={IsAssistantSelected(assistant)}
                />
                <Image 
                  src={assistant.image} 
                  alt={assistant.title} 
                  width={600} 
                  height={600} 
                  className='rounded-xl w-full h-[200px] object-cover border border-gray-600'
                />
                <h2 className='text-center font-bold text-lg mt-3 text-white'>{assistant.name}</h2>
                <h2 className='text-center text-gray-400 text-sm'>{assistant.title}</h2>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AIAssistants
