import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bot, MessageSquare, Sparkles, Zap, Eye, Users, Lightbulb, Cpu } from "lucide-react";
import InteractiveRobot from "./components/InteractiveRobot";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        {/* Neural Network Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-gray-900/40"></div>
        
        {/* Circuit Pattern */}
        <div className="absolute inset-0 opacity-10">
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
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full particle-animation"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent animate-pulse"></div>
      </div>
      
      {/* Interactive Robot Component */}
      <InteractiveRobot />
      
      {/* Floating Innovation Elements */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        {/* Floating Icons */}
        <div className="absolute top-20 left-10 floating-element" style={{animationDelay: '0s'}}>
          <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Cpu className="w-6 h-6 text-blue-400 opacity-80" />
          </div>
        </div>
        <div className="absolute top-40 right-20 floating-element" style={{animationDelay: '1s'}}>
          <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Lightbulb className="w-5 h-5 text-purple-400 opacity-80" />
          </div>
        </div>
        <div className="absolute bottom-40 left-20 floating-element" style={{animationDelay: '2s'}}>
          <div className="w-14 h-14 bg-green-500/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Zap className="w-7 h-7 text-green-400 opacity-80" />
          </div>
        </div>
        <div className="absolute top-60 left-1/2 floating-element" style={{animationDelay: '0.5s'}}>
          <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-yellow-400 opacity-80" />
          </div>
        </div>
        
        {/* Orbiting Elements */}
        <div className="absolute top-1/2 left-1/4 w-32 h-32">
          <div className="absolute inset-0 animate-spin" style={{animationDuration: '20s'}}>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-3 h-3 bg-blue-400 rounded-full opacity-60 glow-effect"></div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24">
          <div className="absolute inset-0 animate-spin" style={{animationDuration: '15s', animationDirection: 'reverse'}}>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-2 h-2 bg-purple-400 rounded-full opacity-60 glow-effect"></div>
            </div>
          </div>
        </div>
      </div>
      {/* Header */}
      <header className="px-6 py-4 border-b border-gray-800 bg-gray-900/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Image src="/logo.svg" alt="AI Genius" width={32} height={32} className="rounded-lg" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <h1 className="text-xl font-bold text-white">AI Genius</h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors relative group">
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#about" className="text-gray-300 hover:text-white transition-colors relative group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#contact" className="text-gray-300 hover:text-white transition-colors relative group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <Link href="/sign-in">
              <Button variant="outline" className="cursor-pointer font-medium border-gray-600 text-black hover:bg-gray-300 hover:border-blue-400 transition-all duration-300">
                Sign In
              </Button>
            </Link>
          </nav>
          
          <div className="md:hidden">
            <Link href="/sign-in">
              <Button variant="outline" className="font-medium border-gray-600 text-black hover:bg-gray-300">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-20 text-center relative z-20">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-gray-800/80 backdrop-blur-sm text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-blue-400/30">
            <Sparkles className="w-4 h-4 animate-pulse" />
            Powered by Advanced AI Technology
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Your Personal
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse"> AI Assistant</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Experience the future of productivity with AI assistants that understand your needs. 
            Chat, create, and accomplish more with intelligent companions tailored for you.
          </p>
          
          <Link href="/sign-in">
            <Button className="cursor-pointer px-8 py-3 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/25">
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-20 bg-gray-800/50 backdrop-blur-sm relative z-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose AI Genius?</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover powerful features designed to enhance your productivity and creativity
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl bg-gray-900/80 backdrop-blur-sm border border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-900 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Bot className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Smart AI Assistants</h3>
              <p className="text-gray-300">
                Choose from multiple AI models including GPT-4, Gemini, and Claude for different tasks
              </p>
            </div>
            
            <div className="text-center p-8 rounded-xl bg-gray-900/80 backdrop-blur-sm border border-gray-700 hover:border-purple-500 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-900 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <MessageSquare className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Natural Conversations</h3>
              <p className="text-gray-300">
                Engage in human-like conversations with context-aware responses and memory
              </p>
            </div>
            
            <div className="text-center p-8 rounded-xl bg-gray-900/80 backdrop-blur-sm border border-gray-700 hover:border-green-500 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
              <div className="w-16 h-16 bg-gradient-to-br from-green-900 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Zap className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Lightning Fast</h3>
              <p className="text-gray-300">
                Get instant responses powered by cutting-edge AI technology and optimized performance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="px-6 py-20 bg-gray-900/50 backdrop-blur-sm relative z-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                The Future of AI Assistance
              </h2>
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                AI Genius brings together the most advanced AI models in one seamless platform. 
                Whether you need help with writing, coding, analysis, or creative tasks, our 
                intelligent assistants are here to help you achieve more.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed">
                Built with cutting-edge technology and designed for modern workflows, 
                AI Genius adapts to your needs and learns from your preferences to provide 
                personalized assistance that gets better over time.
              </p>
            </div>
            <div className="relative">
              <div className="w-full h-80 bg-gradient-to-br from-blue-900 to-purple-900 rounded-2xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-pulse"></div>
                <div className="text-center relative z-10">
                  <Bot className="w-24 h-24 text-blue-400 mx-auto mb-4 animate-pulse" />
                  <p className="text-gray-300 font-medium">AI-Powered Intelligence</p>
                </div>
                {/* Floating elements in the visual */}
                <div className="absolute top-4 left-4 w-3 h-3 bg-blue-400 rounded-full animate-ping"></div>
                <div className="absolute bottom-4 right-4 w-2 h-2 bg-purple-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-4 right-4 w-2 h-2 bg-green-400 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-blue-900/80 to-purple-900/80 backdrop-blur-sm relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Productivity?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Join the future of AI assistance and unlock your potential today
          </p>
          <Link href="/sign-in">
            <Button className="px-8 py-3 text-lg font-semibold bg-white text-gray-900 hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl">
              Start Your Journey
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-6 py-20 bg-gray-800/50 backdrop-blur-sm relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Get in Touch</h2>
          <p className="text-xl text-gray-300 mb-10">
            Have questions or need support? We're here to help you succeed.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-gray-900/80 backdrop-blur-sm border border-gray-700 hover:border-blue-500 transition-all duration-300">
              <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
              <p className="text-gray-300">piyushgo9023@gmail.com</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gray-900/80 backdrop-blur-sm border border-gray-700 hover:border-purple-500 transition-all duration-300">
              <h3 className="text-lg font-semibold text-white mb-2">Contact</h3>
              <p className="text-gray-300">+91 77195-11129</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gray-900/80 backdrop-blur-sm border border-gray-700 hover:border-green-500 transition-all duration-300">
              <h3 className="text-lg font-semibold text-white mb-2">LinkedIn</h3>
              <Link href={"https://www.linkedin.com/in/piyush-goyal-b57027299/"}>
                <p className="text-gray-300">Piyush Goyal</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 bg-gray-900/90 backdrop-blur-sm border-t border-gray-800 relative z-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Image src="/logo.svg" alt="AI Genius" width={24} height={24} className="rounded" />
              <span className="font-semibold text-white">AI Genius</span>
            </div>
            <div className="flex gap-8 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 AI Genius. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
