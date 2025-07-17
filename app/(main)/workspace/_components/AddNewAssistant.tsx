import React, { useContext, useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import AiAssistantsList from '@/services/AiAssistantsList'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { ASSISTANT } from '../../ai-assistants/page'
import AiModelOptions from '@/services/AiModelOptions'
import { Textarea } from '@/components/ui/textarea'
import AssistantAvatar from './AssistantAvatar'
import { toast } from 'sonner'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { AuthContext } from '@/context/AuthContext'
import { AssistantContext } from '@/context/AssistantContext'
import { Loader2Icon } from 'lucide-react'

const DEFAULT_ASSISTANT={
    image: '/bug-fixer.avif',
    name: '',
    title: '',
    instruction: '',
    id: 0,
    sampleQuestions: [],
    userInstruction: '',
    aiModelId: ''
}

function AddNewAssistant({children, assistantCount}: {children: any, assistantCount: number}) {

    const [selectedAssistant, setSelectedAssistant] = useState<ASSISTANT>(DEFAULT_ASSISTANT);
    const AddAssistant=useMutation(api.userAiAssistants.InsertSelectedAssistants)
    const {user} = useContext(AuthContext)
    const [loading, setLoading] = useState(false);
    const {assistant, setAssistant} = useContext(AssistantContext);
    const MAX_ASSISTANTS = 10;
    const onHandleInputChange=(field:string, value:string) => {
        setSelectedAssistant((prev:any)=>({
            ...prev,
            [field]: value
        }))
    }

    const onSave=async()=>{
        // Check if user has reached the maximum limit
        if(assistantCount >= MAX_ASSISTANTS) {
            toast.error(`You can only create up to ${MAX_ASSISTANTS} AI assistants. Please delete some existing assistants to add new ones.`);
            return;
        }

        if(!selectedAssistant?.name || !selectedAssistant.title || !selectedAssistant.userInstruction){
            toast.error('Please fill all the details');
            return;
        }
        setLoading(true);
        const result=await AddAssistant({
            records: [selectedAssistant],
            uid: user?._id
        })
        toast.success('New Assistant Added!')
        setAssistant(null);
        setLoading(false);
    }

  return (
      <Dialog>
          <DialogTrigger asChild>{children}</DialogTrigger>
          <DialogContent className='bg-gray-800 border-gray-700 text-white max-w-4xl w-[95vw] max-h-[90vh] overflow-y-auto'>
              <DialogHeader>
                  <DialogTitle className='text-white'>Add New Assistant</DialogTitle>
                  <DialogDescription asChild>
                      <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5'>
                          <div className='mt-5 lg:border-r border-gray-700 lg:p-3'>
                              <Button variant={'secondary'} size={'sm'} className='w-full bg-gray-700 text-white hover:bg-gray-600' onClick={()=>setSelectedAssistant(DEFAULT_ASSISTANT)}>+ Create New Assistant</Button>
                              <div className='mt-2 max-h-40 lg:max-h-none overflow-y-auto'>
                                  {AiAssistantsList.map((assistant, index) => (
                                      <div className='p-2 hover:bg-gray-700 flex gap-2 items-center rounded-xl cursor-pointer' key={index} onClick={() => setSelectedAssistant(assistant)}>
                                          <Image src={assistant.image} alt={assistant.name} width={60} height={60} className='w-[35px] h-[35px] object-cover rounded-lg flex-shrink-0' />
                                          <h2 className='text-xs text-white truncate'>{assistant.title}</h2>
                                      </div>
                                  ))}
                              </div>
                          </div>
                          <div className='lg:col-span-2'>
                              <div className='flex flex-col sm:flex-row gap-3 sm:gap-5'>
                                  {selectedAssistant && 
                                  <AssistantAvatar selectedImage={(v:string)=>onHandleInputChange('image', v)}>
                                    <Image src={selectedAssistant?.image} alt='assistant' width={150} height={150} className='w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] rounded-xl cursor-pointer object-cover flex-shrink-0' />
                                  </AssistantAvatar>
                                  }
                                  <div className='flex flex-col gap-3 w-full min-w-0'>
                                      <Input placeholder='Name of Assistant' className='w-full bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' value={selectedAssistant?.name} onChange={(event) => onHandleInputChange('name', event.target.value)} />
                                      <Input placeholder='Title of Assistant' className='w-full bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' value={selectedAssistant?.title} onChange={(event) => onHandleInputChange('title', event.target.value)} />
                                  </div>

                              </div>
                              <div className='mt-4'>
                                  <h2 className='text-gray-400'>Model:</h2>
                                  <Select defaultValue={selectedAssistant?.aiModelId} onValueChange={(value) => onHandleInputChange('aiModelId', value)}>
                                      <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                                          <SelectValue placeholder="Select Model" />
                                      </SelectTrigger>
                                      <SelectContent className='bg-gray-700 border-gray-600'>
                                          {AiModelOptions.map((model, index) => (
                                              <SelectItem value={model.name} className='text-white hover:bg-gray-600'>
                                                  <div key={index} className='flex gap-2 items-center m-1'>
                                                      <Image src={model.logo} alt={model.name} width={20} height={20} className='rounded-md' />
                                                      <h2>{model.name}</h2>
                                                  </div>
                                              </SelectItem>
                                          ))}
                                      </SelectContent>
                                  </Select>
                              </div>
                              <div className='mt-5'>
                                <h2 className='text-gray-400'>Instruction:</h2>
                                <Textarea placeholder='Add Instructions' className='h-[150px] sm:h-[200px] bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' value={selectedAssistant.userInstruction} onChange={(event)=>onHandleInputChange('userInstruction',event.target.value)}/>
                              </div>
                              <div className='flex flex-col sm:flex-row gap-3 sm:gap-5 justify-end mt-6 sm:mt-10'>
                                <DialogClose>
                                    <Button variant={'secondary'} className='cursor-pointer bg-gray-700 text-white hover:bg-gray-600 w-full sm:w-auto'>Cancel</Button>
                                </DialogClose>
                                <Button onClick={onSave} className='cursor-pointer bg-blue-600 text-white hover:bg-blue-700 w-full sm:w-auto' disabled={loading}>{loading&&<Loader2Icon className='animate-spin'/>}ADD</Button>
                              </div>
                          </div>
                      </div>
                  </DialogDescription>
              </DialogHeader>
          </DialogContent>
      </Dialog>
  )
}

export default AddNewAssistant
