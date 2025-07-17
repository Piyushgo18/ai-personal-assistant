"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { useContext, useEffect } from 'react'
import { AuthContext } from '@/context/AuthContext'
import { api } from '@/convex/_generated/api'
import { useConvex } from 'convex/react'
import { ASSISTANT } from '../../ai-assistants/page'
import AiAssistantsList from '@/services/AiAssistantsList'
import Image from 'next/image'
import { AssistantContext } from '@/context/AssistantContext'
import { BlurFade } from '@/components/magicui/blur-fade'
import AddNewAssistant from './AddNewAssistant'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { LogOut, UserCircle2 } from 'lucide-react'
import Profile from './Profile'
import { useRouter } from 'next/navigation'

function AssistantList({ onAssistantSelect }: { onAssistantSelect?: () => void }) {
    const {user, setUser} = useContext(AuthContext);
    const convex = useConvex();
    const [assistantList, setAssistantList] = useState<ASSISTANT[]>([]);
    const {assistant, setAssistant} = useContext(AssistantContext);
    const [openProfile, setOpenProfile] = useState(false);
    const router = useRouter();

    useEffect(()=>{
        user && GetUserAssistants();
      }, [user && assistant==null]);
    
      const GetUserAssistants=async()=>{
        const result = await convex.query(api.userAiAssistants.GetAllUserAssistants, {
          uid: user._id
        });
        setAssistantList(result);
      }

      const handleLogout = () => {
        // Clear local session data (not database)
        setUser(null);
        setAssistant(null);
        // Clear localStorage token
        if (typeof window !== 'undefined') {
          localStorage.removeItem('user_token');
        }
        // Redirect to sign-in page
        router.replace('/sign-in');
      }
  return (
    <div className='p-3 md:p-5 bg-gray-800 border-r border-gray-700 h-screen relative text-white overflow-hidden flex flex-col'>
      <div className='flex justify-between items-center'>
        <h2 className='font-bold text-sm md:text-lg text-white'>Your Personal AI Assistants</h2>
      </div>
      <AddNewAssistant assistantCount={assistantList.length}>
        <Button className='w-full mt-3 cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xs md:text-sm'>
          + Add New Assistant
        </Button>
      </AddNewAssistant>
      <Input className='bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 mt-3 text-sm' placeholder='Search'/>
      <div className='mt-5 overflow-y-auto flex-1 pr-2 hide-scrollbar'>
        {assistantList.map((assistant_, index) => (
          <BlurFade key={assistant_.image} delay={0.25 + index * 0.05} inView>
            <div className={`p-2 flex gap-2 md:gap-3 items-center hover:bg-gray-700 rounded-xl cursor-pointer mt-2 transition-all duration-200 ${assistant_.id == assistant?.id && 'bg-gray-700 border border-blue-500'}`} key={index} onClick={()=>{setAssistant(assistant_); onAssistantSelect?.()}}>
                <Image src={assistant_.image} alt={assistant_.name} width={60} height={60} className='rounded-xl w-[40px] h-[40px] md:w-[60px] md:h-[60px] object-cover flex-shrink-0'/>
                <div className='min-w-0 flex-1'>
                    <h2 className='font-bold text-white text-sm md:text-base truncate'>{assistant_.name}</h2>
                    <h2 className='text-gray-400 text-xs md:text-sm truncate'>{assistant_.title}</h2>
                </div>
            </div>
            </BlurFade>
        ))}
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className='mt-auto mb-3 flex gap-2 md:gap-3 items-center hover:bg-gray-700 p-2 rounded-xl cursor-pointer transition-all duration-200'>
            <Image src={user?.picture} alt='user' width={35} height={35} className='rounded-full w-[30px] h-[30px] md:w-[35px] md:h-[35px] flex-shrink-0'/>
            <div className='min-w-0 flex-1'>
              <h2 className='font-bold text-white text-sm truncate'>{user?.name}</h2>
              <h2 className='text-gray-400 text-xs truncate'>{user?.orderId ? 'Pro Plan' : 'Free Plan'}</h2>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-[200px] bg-gray-800 border-gray-700 text-white'>
          <DropdownMenuLabel className='text-white'>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator className='bg-gray-700' />
          <DropdownMenuItem className='text-white hover:bg-gray-700' onClick={()=>setOpenProfile(true)}><UserCircle2/> Profile</DropdownMenuItem>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem className='text-white hover:bg-gray-700' onSelect={(e) => e.preventDefault()}>
                <LogOut/> Logout
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent className='bg-gray-800 border-gray-700 text-white'>
              <AlertDialogHeader>
                <AlertDialogTitle className='text-white'>Are you sure you want to logout?</AlertDialogTitle>
                <AlertDialogDescription className='text-gray-300'>
                  This will sign you out of your account and redirect you to the sign-in page.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className='bg-gray-700 text-white hover:bg-gray-600 border-gray-600'>Cancel</AlertDialogCancel>
                <AlertDialogAction className='bg-red-600 text-white hover:bg-red-700' onClick={handleLogout}>Logout</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>
      <Profile openDialog={openProfile} onClose={() => setOpenProfile(false)} />
    </div>
  )
}

export default AssistantList
