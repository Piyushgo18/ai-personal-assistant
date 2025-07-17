# 🤖 AI Personal Assistant Platform

A modern, multi-provider AI assistant platform built with Next.js 15, TypeScript, and Convex. Create, manage, and chat with up to 10 custom AI assistants, each with unique roles and personalities.

## ✨ Features
- Multi-provider AI (Google Gemini, Groq Llama)
- Create & manage up to 10 assistants
- Real-time chat UI
- Google OAuth authentication
- Razorpay subscription system
- Responsive dark theme (mobile drawer)
- Toast notifications & error handling

## 🛠️ Tech Stack
- Next.js 15, TypeScript, Tailwind CSS
- Convex (real-time DB)
- Radix UI, shadcn/ui, Lucide icons
- Razorpay, Google OAuth

## 🚀 Getting Started
1. **Clone & install**
   ```bash
   git clone https://github.com/yourusername/ai-personal-assistant.git
   cd ai-personal-assistant
   npm install
   ```
2. **Configure .env.local** (see `.env.example` for keys)
3. **Start Convex**
   ```bash
   npx convex dev
   ```
4. **Run the app**
   ```bash
   npm run dev
   ```

## 📁 Structure
- `app/` - Next.js app & API routes
- `components/` - UI library
- `convex/` - DB functions
- `services/` - AI configs & templates
- `context/` - State providers
- `public/` - Assets

## 📝 Usage
- Sign in with Google
- Create or select assistants
- Chat in real time
- Manage subscription & tokens
- Use mobile drawer for assistants

## 🏆 Deployment
- Deploy on Vercel or any Node host
- Set env vars in dashboard

## 📄 License
MIT

---
Built with ❤️ using Next.js and AI
