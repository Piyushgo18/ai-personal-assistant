import React from 'react'
import AssistantList from './_components/AssistantList'
import AssistantSettings from './_components/AssistantSettings'
import ChatUi from './_components/ChatUi'

function Workspace() {
  return (
    <div className='h-screen fixed w-full bg-gray-900 text-white overflow-hidden'>
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
          {[...Array(4)].map((_, i) => (
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
      <div className='flex relative z-10 h-screen'>
        {/* Assistant List - Sidebar */}
        <div className='hidden md:block md:w-64 lg:w-72 flex-shrink-0'>
            <AssistantList/>
        </div>
        
        {/* Chat UI - Main Content */}
        <div className='flex-1 min-w-0'>
          <ChatUi/>
        </div>
        
        {/* Assistant Settings - Right Sidebar */}
        <div className='hidden lg:block lg:w-64 xl:w-72 flex-shrink-0'>
          <AssistantSettings/>
        </div>
      </div>
    </div>
  )
}

export default Workspace
