# 🤖 AI Personal Assistant Platform

A sophisticated, multi-provider AI assistant platform built with Next.js 15, TypeScript, and real-time database capabilities. Create, manage, and interact with up to 10 personalized AI assistants, each with unique roles and specialized knowledge domains.

![AI Personal Assistant](https://img.shields.io/badge/AI-Personal%20Assistant-blue?style=for-the-badge&logo=openai)
![Next.js](https://img.shields.io/badge/Next.js-15.3.5-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Convex](https://img.shields.io/badge/Database-Convex-orange?style=for-the-badge)

## ✨ Key Features

- **🤖 Multi-Provider AI**: Google Gemini 1.5 Flash & Groq Llama 3.1 integration
- **👥 Custom Assistants**: Create up to 10 personalized AI assistants with unique roles
- **💬 Real-time Chat**: Smooth, responsive chat interface with message streaming
- **🔐 Secure Auth**: Google OAuth integration with session management
- **💳 Subscription System**: Razorpay payment integration with credit management
- **📱 Responsive Design**: Mobile-first approach with hamburger menu for mobile
- **🎨 Modern UI**: Dark theme with animated backgrounds and toast notifications
- **⚡ Smart Limits**: Progressive warning system for assistant creation limits

## 🛠️ Tech Stack

**Frontend:** Next.js 15.3.5, TypeScript, Tailwind CSS, Radix UI, shadcn/ui  
**Backend:** Convex (Real-time Database), Next.js API Routes  
**AI Providers:** Google Gemini, Groq  
**Authentication:** Google OAuth  
**Payments:** Razorpay  

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Google OAuth credentials
- Convex account
- AI provider API keys (Google, Groq)

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/ai-personal-assistant.git
cd ai-personal-assistant

# Install dependencies
npm install

# Set up environment variables (copy .env.example to .env.local)
cp .env.example .env.local

# Initialize Convex
npx convex dev

# Run development server
npm run dev
```

### Environment Variables

Create `.env.local` file:

```env
# Convex
CONVEX_DEPLOYMENT=your_convex_deployment_url
NEXT_PUBLIC_CONVEX_URL=your_public_convex_url

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# AI Providers
GOOGLE_API_KEY=your_google_gemini_api_key
GROQ_API_KEY=your_groq_api_key

# Razorpay (Optional)
NEXT_PUBLIC_RAZORPAY_LIVE_KEY=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret
```

## 📁 Project Structure

```
ai-personal-assistant/
├── app/                     # Next.js app directory
│   ├── (auth)/sign-in/     # Authentication
│   ├── (main)/             # Main application
│   └── api/                # API routes
├── components/ui/          # UI components
├── convex/                 # Database functions
├── context/                # React contexts
└── services/               # External services
```

## 🎮 Usage

1. **Sign in** with Google account
2. **Create assistants** with custom roles and instructions
3. **Chat** with your personalized AI assistants
4. **Manage** assistants via sidebar (mobile: hamburger menu)
5. **Upgrade** to Pro for more credits (optional)

## 🚀 Deployment

**Vercel (Recommended):**
1. Connect repository to Vercel
2. Set environment variables in dashboard
3. Deploy automatically on git push

**Manual:**
```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Vercel** for Next.js framework
- **Convex** for real-time backend infrastructure
- **shadcn/ui** for beautiful UI components

---

<div align="center">
  <strong>Built with ❤️ using Next.js and AI</strong>
</div>
