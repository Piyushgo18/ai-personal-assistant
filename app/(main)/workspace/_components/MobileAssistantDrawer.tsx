"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import AssistantList from './AssistantList'

function MobileAssistantDrawer() {
  const [open, setOpen] = useState(false)

  return (
    <div className='md:hidden'>
      {/* Mobile Menu Button */}
      <Button 
        variant="ghost" 
        size="icon" 
        className='fixed top-4 left-4 z-50 bg-gray-800 hover:bg-gray-700 text-white border border-gray-600'
        onClick={() => setOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Mobile Drawer Overlay */}
      {open && (
        <div className='fixed inset-0 z-40'>
          {/* Backdrop */}
          <div 
            className='absolute inset-0 bg-black bg-opacity-50' 
            onClick={() => setOpen(false)}
          />
          
          {/* Drawer Content */}
          <div className='absolute left-0 top-0 h-full w-80 bg-gray-800 transform transition-transform duration-300 ease-in-out'>
            {/* Close Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className='absolute top-4 right-4 z-10 text-white hover:bg-gray-700'
              onClick={() => setOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
            
            {/* Assistant List */}
            <div className='h-full'>
              <AssistantList onAssistantSelect={() => setOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MobileAssistantDrawer
