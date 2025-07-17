import { SparklesText } from '@/components/magicui/sparkles-text'
import React,{useContext} from 'react'
import { AssistantContext } from '@/context/AssistantContext'
import { ChevronRight } from 'lucide-react'
import { BlurFade } from '@/components/magicui/blur-fade'

interface EmptyChatStateProps {
  onSuggestionClick: (suggestion: string) => void;
}

function EmptyChatState({ onSuggestionClick }: EmptyChatStateProps) {
    const {assistant,setAssistant} = useContext(AssistantContext)
  return (
    <div className='flex flex-col items-center'>
      <SparklesText className='text-4xl text-center'>How Can I Assist You?</SparklesText>
      <div className='mt-7'>
        {assistant?.sampleQuestions.map((suggestion:string,index:number)=>(
            <BlurFade delay={0.25*index} key={suggestion}>
            <div key={index}>
                <h2 className='p-4 text-lg border mt-1 rounded-xl hover:bg-gray-800 flex items-center justify-between gap-10 cursor-pointer' onClick={() => onSuggestionClick(suggestion)}>{suggestion} <ChevronRight/> </h2>
            </div>
            </BlurFade>
        ))}
      </div>
    </div>
  )
}

export default EmptyChatState
