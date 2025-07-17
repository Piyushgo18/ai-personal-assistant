'use client';

import React, { useEffect, useState } from 'react';
import { Bot, MessageSquare, Sparkles } from 'lucide-react';

export default function InteractiveRobot() {
  const [robotState, setRobotState] = useState('idle');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setRobotState('walking');
      setTimeout(() => setRobotState('idle'), 1000);
    };

    const handleClick = () => {
      setRobotState('celebrating');
      setTimeout(() => setRobotState('idle'), 2000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  const getEyeDirection = () => {
    if (!isMounted || typeof document === 'undefined') {
      return { x: 0, y: 0 };
    }
    
    const robotElement = document.querySelector('.robot-container');
    if (!robotElement) return { x: 0, y: 0 };
    
    const rect = robotElement.getBoundingClientRect();
    const robotCenter = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
    
    const deltaX = mousePosition.x - robotCenter.x;
    const deltaY = mousePosition.y - robotCenter.y;
    
    return {
      x: Math.max(-2, Math.min(2, deltaX / 100)),
      y: Math.max(-2, Math.min(2, deltaY / 100))
    };
  };

  const eyeDirection = getEyeDirection();

  const getRobotExpression = () => {
    switch (robotState) {
      case 'walking':
        return 'animate-bounce';
      case 'celebrating':
        return 'animate-spin';
      default:
        return 'animate-pulse';
    }
  };

  const getRobotMessage = () => {
    switch (robotState) {
      case 'walking':
        return "I'm following you! 🚶‍♂️";
      case 'celebrating':
        return "Great click! 🎉";
      default:
        return isHovered ? "Hi there! 👋" : "AI Assistant";
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div 
        className={`robot-container cursor-pointer group ${getRobotExpression()}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setRobotState('celebrating')}
      >
        <div className="relative">
          {/* Robot Body */}
          <div className="w-16 h-20 bg-gradient-to-b from-blue-500 to-blue-600 rounded-lg border-2 border-blue-400 shadow-lg transform transition-all duration-300 hover:scale-110 glow-effect">
            {/* Robot Head */}
            <div className="w-10 h-8 bg-gradient-to-b from-gray-300 to-gray-400 rounded-t-lg mx-auto -mt-2 border border-gray-500">
              {/* Eyes */}
              <div className="flex justify-between px-2 pt-1">
                <div 
                  className="w-2 h-2 bg-blue-400 rounded-full transition-all duration-200 robot-eyes"
                  style={{
                    transform: `translate(${eyeDirection.x}px, ${eyeDirection.y}px)`
                  }}
                ></div>
                <div 
                  className="w-2 h-2 bg-blue-400 rounded-full transition-all duration-200 robot-eyes"
                  style={{
                    transform: `translate(${eyeDirection.x}px, ${eyeDirection.y}px)`
                  }}
                ></div>
              </div>
            </div>
            
            {/* Robot Screen */}
            <div className="w-8 h-4 bg-green-400 rounded mx-auto mt-2 flex items-center justify-center">
              <div className={`w-6 h-2 bg-green-600 rounded ${robotState === 'celebrating' ? 'animate-pulse' : ''}`}></div>
            </div>
            
            {/* Robot Arms */}
            <div className={`absolute -left-2 top-4 w-4 h-2 bg-blue-500 rounded-full transition-all duration-300 ${robotState === 'celebrating' ? 'animate-bounce' : ''}`}></div>
            <div className={`absolute -right-2 top-4 w-4 h-2 bg-blue-500 rounded-full transition-all duration-300 ${robotState === 'celebrating' ? 'animate-bounce' : ''}`}></div>
            
            {/* Antenna */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
              <div className="w-1 h-3 bg-gray-500"></div>
              <div className="w-2 h-2 bg-red-400 rounded-full mx-auto animate-pulse"></div>
            </div>
          </div>
          
          {/* Robot Legs */}
          <div className="flex justify-between px-3 mt-1">
            <div className={`w-3 h-6 bg-blue-500 rounded-b-lg transition-all duration-300 ${robotState === 'walking' ? 'animate-bounce' : ''}`}></div>
            <div className={`w-3 h-6 bg-blue-500 rounded-b-lg transition-all duration-300 ${robotState === 'walking' ? 'animate-bounce' : ''}`} style={{animationDelay: '0.1s'}}></div>
          </div>
          
          {/* Speech Bubble */}
          <div className={`absolute -top-16 -left-20 bg-gray-800 text-white px-3 py-2 rounded-lg text-xs transition-all duration-300 ${isHovered || robotState !== 'idle' ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-2'}`}>
            {getRobotMessage()}
            <div className="absolute bottom-0 left-8 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800 transform translate-y-full"></div>
          </div>
          
          {/* Sparkles for celebration */}
          {robotState === 'celebrating' && (
            <div className="absolute -top-2 -left-2 w-20 h-24 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <Sparkles
                  key={i}
                  className="absolute w-4 h-4 text-yellow-400 animate-ping"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.2}s`
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
