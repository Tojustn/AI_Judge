# AI Judge

## Overview
AI Judge evaluates user-submitted answers using AI models. Each answer gets a verdict (`pass` / `fail` / `inconclusive`) and reasoning.

## Design Notes & Trade-offs

- **Persistence:** Submissions, judges, and evaluations are stored in Supabase. This ensures data survives page reloads and allows multi-user access without building a separate backend.

- **LLM Security:** API keys are stored server-side via Supabase Edge Functions. This prevents exposing sensitive keys in the frontend, which is critical for security.

- **Architecture / Workflow:** Evaluations run queue-by-queue instead of per submission. This reduces unnecessary API calls and ensures consistent processing across a queue.

- **Scope Cuts / Feature Decisions:**  
  - Only **GPT-4o Mini** is supported, as it is the most cost effective (I already had some tokens).  
  - File attachments (screenshots, PDFs) are not sent to the LLM. Supporting this would require additional API handling.  
  - Sequential processing was chosen to simplify progress tracking.

- **Database Modeling:** Questions use a composite foreign key `(questionId, queueId)` so multiple queues can reuse the same question templates without duplication.

- **Deployment:** The entire app runs as a single React project (`npm run dev`); no extra backend server is required aside from Supabase. As per the deliverables

## Time Spent
**~16 hours** - Focused on core functionality and Database Design.