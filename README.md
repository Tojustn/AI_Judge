# AI Judge

AI-powered answer evaluation system using GPT-4 to automatically grade submissions with verdicts and reasoning.

![Demo](screenshots/demo.gif)

## What It Does

Evaluates user submissions against predefined questions using OpenAI's GPT-4o Mini. Each answer gets a verdict (`pass` / `fail` / `inconclusive`) with AI-generated reasoning.

## Tech Stack

**Frontend**: React, TypeScript, Vite, Tailwind CSS  
**Backend**: Supabase (PostgreSQL + Edge Functions)  
**AI**: OpenAI GPT-4o Mini

## Key Features

- Queue-based evaluation workflow
- Secure server-side API key management via Edge Functions
- Composite foreign keys for reusable question templates
- Real-time progress tracking

## Design Decisions

- **Security**: API keys never exposed to client - all LLM calls proxied through Supabase Edge Functions
- **Sequential Processing**: Simplifies progress tracking over parallel processing
- **GPT-4o Mini**: Cost-effective while maintaining quality
- **No Authentication**: Focus on core evaluation functionality

## Running Locally

```bash
# Clone and install
git clone https://github.com/Tojustn/AI_Judge.git
cd AI_Judge
npm install

# Set up .env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Run
npm run dev
```

Requires Supabase project with Edge Functions deployed.
---
