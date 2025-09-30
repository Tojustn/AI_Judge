# AI Judge

## Overview
AI Judge evaluates user-submitted answers using AI models. Each answer gets a verdict (`pass` / `fail` / `inconclusive`) and reasoning.

## Design Notes & Trade-offs

- **Persistence:** Submissions, judges, and evaluations are stored in Supabase. This ensures data persistence.

- **LLM Security:** API keys are stored server-side via Supabase Edge Functions. This prevents exposing sensitive keys in the frontend, which is critical for security.

- **Architecture / Workflow:** Workflow shows questions per queue instead of per submission. Gives a better picture of the evaluation structure since they run per queue.

- **Scope Cuts / Feature Decisions:**  
  - Only **GPT-4o Mini** is supported, as it is the most cost effective (I already had some tokens).  
  - File attachments (screenshots, PDFs) are not sent to the LLM. Supporting this would require additional API handling.  
  - Sequential processing was chosen to simplify progress tracking.
  - No user authentication this would take away from focusing on core functionality 

- **Database Modeling:** Questions use a composite foreign key `(questionId, queueId)` so multiple queues can reuse the same question templates without duplication.

- **Deployment:** The entire app runs as a single React project (`npm run dev`); no extra backend server is required aside from Supabase. As per the deliverables

## Time Spent
**~16 hours** - Focused on core functionalities and Database Integration