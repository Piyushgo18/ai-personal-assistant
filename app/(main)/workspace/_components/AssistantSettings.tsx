"use client"
import { AssistantContext } from '@/context/AssistantContext'
import Image from 'next/image'
import React, { useContext, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import AiModelOptions from '@/services/AiModelOptions'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Loader2Icon, Save, Trash } from 'lucide-react'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { toast } from 'sonner'
import ConfirmationAlert from '../ConfirmationAlert'
import { BlurFade } from '@/components/magicui/blur-fade'

function AssistantSettings() {
  const {assistant,setAssistant} = useContext(AssistantContext) 
  const UpdateAssistant=useMutation(api.userAiAssistants.UpdateUserAiAssistant)
  const DeleteAssistant=useMutation(api.userAiAssistants.DeleteAssistant)
  const [loading,setLoading] = useState(false);
  const onHandleInputChange=(field:string,value:string)=>{
    setAssistant((prev:any)=>({
      ...prev,
      [field]: value
    }));
  }

  const OnSave=async()=>{
    setLoading(true)

    const result = await UpdateAssistant({
      id: assistant?._id,
      aiModelId: assistant?.aiModelId,
      userInstruction: assistant?.userInstruction
    })
    toast('Saved!')
    setLoading(false);
  }

  const OnDelete=async()=>{
    setLoading(true);
    await DeleteAssistant({
      id: assistant?._id
    })
    setAssistant(null);
    setLoading(false);
  }

  return assistant&&(
    <div className='p-5 bg-gray-800 border-l border-gray-700 h-screen text-white'>
      <h2 className='font-bold text-xl text-white'>Settings</h2>
      <BlurFade delay={0.25}>
      <div className='mt-4 flex gap-3'>
        <Image src={assistant?.image} alt='assistant' width={100} height={100} className='rounded-xl w-[80px] h-[80px]'/>
        <div>
          <h2 className='font-bold text-white'>{assistant?.name}</h2>
          <p className='text-gray-400'>{assistant?.title}</p>
        </div>
      </div>
      </BlurFade>
      <BlurFade delay={0.25*2}>
      <div className='mt-4'>
          <h2 className='text-gray-400'>Model:</h2>
          <Select defaultValue={assistant.aiModelId} onValueChange={(value)=>onHandleInputChange('aiModelId',value)}>
            <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
              <SelectValue placeholder="Select Model" />
            </SelectTrigger>
            <SelectContent className='bg-gray-700 border-gray-600 text-white'>
              {AiModelOptions.map((model,index)=>(
                <SelectItem value={model.name} className='hover:bg-gray-600 text-white'>
                  <div key={index} className='flex gap-2 items-center m-1'>
                    <Image src={model.logo} alt={model.name} width={20} height={20} className='rounded-md'/>
                    <h2>{model.name}</h2>
                  </div>
                </SelectItem>
              ))}              
            </SelectContent>
          </Select>
        </div>
        </BlurFade>
        <BlurFade delay={0.25*3}>
        <div className='mt-4'>
          <h2 className='text-gray-400'>Instruction:</h2>
          <Textarea placeholder='Add Instruction' className='h-[180px] bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' value={assistant?.userInstruction} onChange={(e)=>onHandleInputChange('userInstruction',e.target.value)}/>
        </div>
        </BlurFade>
        <div className='absolute bottom-10 right-5 flex gap-5'>
          <ConfirmationAlert OnDelete={OnDelete}>
            <Button disabled={loading} variant="ghost" className='cursor-pointer hover:bg-gray-700 text-white'> <Trash/> Delete</Button>
          </ConfirmationAlert>
          <Button onClick={OnSave} disabled={loading} className='cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'>{loading?<Loader2Icon className='animate-spin'/>: <Save/> }Save</Button>
        </div>
    </div>
  )
}

export default AssistantSettings
