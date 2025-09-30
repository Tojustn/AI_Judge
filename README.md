# AI Judge

## Overview
AI Judge evaluates user-submitted answers using AI models. Each answer gets a verdict (`pass` / `fail` / `inconclusive`) and reasoning.

## Features
* Upload submissions JSON
* Create, edit, activate AI Judges with custom prompts
* Assign judges per question within queues
* Run AI evaluations via **OpenAI GPT-4o Mini**
* Results dashboard with filters and animated charts (Chart.js)
* Real-time evaluation progress tracking

## Quick Start
```bash
npm run dev
```

## Design Notes & Trade-offs
* **Persistence:** Supabase stores submissions, judges, and evaluations
* **LLM Security:** API keys stored server-side via Supabase Edge Functions  
* **Architecture:** Queue-based workflow - judges run on entire queues, not individual submissions
* **UI/UX:** Responsive design with loading states and error handling
* **Deployment:** Single React app; runs with `npm run dev`
* **Scope Cuts:** Only GPT-4o Mini supported; file attachments to LLM not implemented

## Time Spent
**~16 hours** - Focused on core functionalities and Database Integration