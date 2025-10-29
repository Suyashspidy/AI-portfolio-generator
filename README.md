# Promptfolio
<img width="960" height="503" alt="image" src="https://github.com/user-attachments/assets/0e7d57ee-d089-4adc-80a3-f6b6c22d2538" />


An AI-powered personal portfolio generator that creates beautiful, unique portfolio websites from just 5 simple questions.

## Features

- **5-Question Form**: Simple questionnaire to capture your professional identity
- **AI-Powered Generation**: Claude AI creates personalized content including tagline, bio, skills, and projects
- **Creativity Control**: "Make it weirder" slider adjusts AI creativity from professional to experimental
- **Live Preview**: Instant preview of your generated portfolio with smooth animations
- **One-Click Deploy**: Deploy your portfolio to Vercel with a custom project name
- **Regenerate**: Don't like the result? Regenerate with different answers or creativity levels
- **Modern Design**: Dark theme with gradient accents, smooth animations, and responsive layout

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS v4 with custom design tokens
- **Animations**: Framer Motion for smooth transitions
- **AI**: Anthropic Claude via Vercel AI SDK
- **Storage**: Vercel Blob for portfolio persistence
- **Deployment**: Vercel (optimized for seamless deployment)

## How It Works

1. **Answer Questions**: Fill out 5 questions about yourself (name, role, skills, projects, contact)
2. **Set Creativity**: Adjust the "Make it weirder" slider to control AI creativity (0-100%)
3. **Generate**: Claude AI analyzes your answers and generates a complete portfolio structure
4. **Preview**: See your portfolio come to life with hero section, about, skills, projects, and contact
5. **Deploy**: One-click deployment creates a static HTML version and stores it in Vercel Blob
6. **Share**: Get a unique URL to share your AI-generated portfolio

## Getting Started

### Local Development

1. Clone the repository

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Set up environment variables:
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

4. Add your Anthropic API key to `.env.local`:
   \`\`\`env
   ANTHROPIC_API_KEY=your_api_key_here
   BLOB_READ_WRITE_TOKEN=your_blob_token_here
   \`\`\`
   - Get your Anthropic API key from [Anthropic Console](https://console.anthropic.com/)
   - Get your Blob token from [Vercel Dashboard](https://vercel.com/dashboard)

5. Run development server:
   \`\`\`bash
   npm run dev
   \`\`\`

6. Open [http://localhost:3000](http://localhost:3000)

### Deployment to Vercel

**No API key needed!** When deployed to Vercel, the app automatically uses Vercel's AI Gateway.

1. Push your code to GitHub
2. Import the project in Vercel
3. Add `BLOB_READ_WRITE_TOKEN` environment variable (Vercel will prompt you)
4. Deploy - that's it!

The AI SDK will automatically use Vercel's AI Gateway in production, which provides:
- Built-in API key management
- Request caching
- Cost optimization
- No additional configuration needed

## API Key Setup

### For Local Development

**Required:**
- `ANTHROPIC_API_KEY` in `.env.local`
  - Get it from: https://console.anthropic.com/
- `BLOB_READ_WRITE_TOKEN` in `.env.local`
  - Get it from: https://vercel.com/dashboard/stores

### For Production (Vercel)

**Required:**
- `BLOB_READ_WRITE_TOKEN` - Add via Vercel Dashboard
  - Vercel will automatically prompt you to add this during deployment

**Not Required:**
- `ANTHROPIC_API_KEY` - Vercel AI Gateway handles authentication automatically
- No additional environment variables needed
- Works out of the box after deployment

## Troubleshooting

### Generation Issues

- **"Generation failed" error**: Check that your `ANTHROPIC_API_KEY` is set correctly in local development
- **Slow generation**: Claude typically takes 5-10 seconds to generate a complete portfolio
- **Empty fields**: Ensure all 5 questions are answered before clicking "Generate Portfolio"

### Deploy Issues

- **Deploy button not working**: Verify `BLOB_READ_WRITE_TOKEN` is set in environment variables
- **"Failed to deploy" error**: Check browser console for detailed error messages (look for `[v0]` prefix)
- **Blob storage errors**: Ensure your Vercel Blob store is properly configured

### API Errors

- **Local**: Verify `ANTHROPIC_API_KEY` is set in `.env.local`
- **Production**: No action needed - AI Gateway handles it automatically
- Check browser console for specific error messages

## Architecture

\`\`\`
┌─────────────────┐
│   Browser UI    │
├─────────────────┤
│ Question Form   │ ← 5 questions + creativity slider
│ Portfolio View  │ ← Dynamic preview with animations
└────────┬────────┘
         │
         ↓ (POST /api/generate-portfolio)
┌─────────────────┐
│  Next.js API    │
├─────────────────┤
│ Claude AI       │ ← Generates portfolio content
│ Vercel Blob     │ ← Stores generated portfolios
└─────────────────┘
\`\`\`

## Project Structure

\`\`\`
promptfolio/
├── app/
│   ├── api/
│   │   └── generate-portfolio/
│   │       └── route.ts          # AI generation endpoint
│   ├── layout.tsx                # Root layout with fonts
│   ├── page.tsx                  # Main app logic
│   └── globals.css               # Design tokens & styles
├── components/
│   ├── question-form.tsx         # 5-question form
│   ├── portfolio-preview.tsx     # Dynamic portfolio display
│   └── deploy-dialog.tsx         # Deploy modal
└── README.md
\`\`\`

## Customization

### Adjusting AI Creativity

The "Make it weirder" slider controls Claude's `temperature` parameter:
- **0%**: Professional and conservative (temperature: 0.3)
- **50%**: Balanced creativity (temperature: 0.65)
- **100%**: Maximum creativity and experimentation (temperature: 1.0)

### Modifying Design

All design tokens are defined in `app/globals.css`:
- Colors: `--background`, `--foreground`, `--primary`, `--accent`
- Spacing: Tailwind's default spacing scale
- Typography: Geist Sans and Geist Mono fonts

## License

MIT

---

Built with ❤️ using Next.js, Claude AI, and Vercel
