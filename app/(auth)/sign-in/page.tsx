"use client"
import React, { useContext, useEffect } from 'react'
import Image from "next/image";
import { Button } from '@/components/ui/button';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { GetAuthUserData } from '@/services/GlobalApi';
import { useMutation, useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Sparkles, Bot, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

function SignIn() {
  
const CreateUser = useMutation(api.users.CreateUser);
const {user, setUser} = useContext(AuthContext);
const router=useRouter();

const googleLogin = useGoogleLogin({
  onSuccess: async (tokenResponse) => {
    if(typeof window !== undefined) {
        localStorage.setItem('user_token', tokenResponse.access_token);
    }
    const user=await GetAuthUserData(tokenResponse.access_token);

    const result = await CreateUser({
        nume: user?.name,
        email: user?.email,
        picture: user.picture
    });
    setUser(result);
    router.replace('/ai-assistants');
  },
  onError: errorResponse => {
    // Handle error silently or show user-friendly message
  },
});

  return (
    <div className='min-h-screen bg-gray-900 text-white relative overflow-hidden'>
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        {/* Neural Network Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-gray-900/40"></div>
        
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
          {[...Array(8)].map((_, i) => (
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

      {/* Back to Home Link */}
      <div className="absolute top-6 left-6 z-50">
        <Link href="/" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>

      {/* Main Content */}
      <div className='flex items-center justify-center h-screen relative z-20'>
        <div className='flex flex-col items-center gap-6 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-xl p-12 shadow-2xl max-w-md w-full mx-4'>
          {/* Logo with Glow Effect */}
          <div className="relative">
            <div className="absolute inset-0 bg-blue-400 rounded-full blur-lg opacity-30 animate-pulse"></div>
            <Image src={'/logo.svg'} alt='logo' width={60} height={60} className="relative z-10 rounded-lg"/>
          </div>

          {/* AI Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-900/50 text-blue-400 px-3 py-1 rounded-full text-sm font-medium border border-blue-400/30">
            <Sparkles className="w-4 h-4 animate-pulse" />
            AI Genius
          </div>

          {/* Title */}
          <h2 className='text-2xl font-bold text-center leading-tight'>
            Sign In to 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"> AI Personal Assistant</span>
            <span className="block text-lg text-gray-300 mt-1">& Agent</span>
          </h2>

          {/* Sign In Button */}
          <Button 
            onClick={()=>googleLogin()} 
            className='cursor-pointer w-full py-3 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/25'
          >
            <div className="flex items-center justify-center gap-2">
              <Bot className="w-5 h-5" />
              Sign In with Google
            </div>
          </Button>

          {/* Additional Info */}
          <p className="text-sm text-gray-400 text-center mt-2">
            Access your personalized AI assistants and unlock the power of intelligent automation
          </p>
        </div>
      </div>
    </div>    
  )
}

export default SignIn
