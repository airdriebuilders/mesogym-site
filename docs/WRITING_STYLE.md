# Meso Gym writing style guide

## Purpose
Use this guide for public website copy and, once approved, app copy. Sound like a knowledgeable, approachable personal trainer: friendly, natural, clear and concise. Help people understand what to do and why it matters.

## Principles
- Lead with the benefit, then explain how the feature works. Prefer concrete examples to broad marketing promises.
- Speak directly to the reader using “you” and “your”. Use “we” sparingly and only where it sounds natural.
- Keep headings short and in sentence case. Buttons should say what happens next: “Try the demo”, “See plans”, “Save changes”.
- Write in plain British English. Keep established product labels exactly as they appear in the app where they are needed for navigation.
- Explain technical terms on first use; do not eliminate useful training terminology.
- Avoid robotic repetition, exaggerated claims, sales pressure, unexplained acronyms and unnecessary Title Case.
- Preserve meaning, qualification and accuracy. Do not promise guaranteed results, injury prevention or recovery outcomes.
- Avoid vague promises such as “revolutionary”, “effortless gains”, “AI-powered transformation” and “perfect plan”.
- Be welcoming to beginners, experienced lifters, families, personal trainers and gyms without treating one group as the only audience.

## Training terminology
- **Mesocycle:** a training block lasting several weeks, typically followed by an easier recovery week.
- **RIR (reps in reserve):** how many more reps you could have done before reaching failure.
- **Deload:** an easier week to help you recover before the next training block.
- **Progressive overload:** gradually increasing the challenge as you get stronger.
Use precise terminology where the app does, with a brief plain-language explanation when first introduced.

## UI copy
- Name the action, not the implementation. “Swap exercise” rather than “Initiate exercise replacement”.
- Tell the user whether changes are saved locally, queued, sent or applied. Never imply a client received a change that is only queued.
- Make errors actionable: what went wrong and what to do next.
- Use consistent labels for the same action across hypertrophy, cardio, coach and client screens.
- Keep confirmation and warning copy accurate about scope (“This session only” versus “Rest of the meso”).
- Do not silently rename labels that tests, accessibility selectors or user documentation depend on.

## Accuracy and change controls
- Check every claim against the current product: pricing, trial availability, device support, coaching features, data syncing and subscriptions.
- Preserve SEO intent, canonical URLs, structured data, navigation, accessibility, links, tests and CSS hooks.
- Treat pricing, payments, legal terms, privacy claims and platform availability as fact-sensitive; flag for owner review instead of guessing.
- Make focused copy-only changes. Do not rewrite application behaviour to accommodate wording.
- Before calling work complete, verify all edited pages render, links/buttons work, mobile text wraps, and no unintended content changed.
- For app changes, run relevant tests and builds, and report pass/fail/not tested. Never deploy or merge without owner approval.

## Examples
Before: “A Complete Plan In Under A Minute”
After: “Your training plan, ready in minutes”

Before: “Next Week Is Built From How This Week Went”
After: “Your training adapts as you improve”

Before: “Swap The A4 Binder For A Live Client Dashboard”
After: “Spend more time coaching, less time on admin”

## Working with Grok
1. Read this guide before changing app copy.
2. Inventory existing strings and shared components first; do not create duplicate interfaces.
3. Suggest changes that preserve the exact meaning and product behaviour.
4. Verify navigation, loading, error, empty, confirmation and persistence states.
5. Report exact changed files, tests and any unverified claims.
6. Keep PRs draft and do not merge, deploy or alter payments, Functions or Firestore rules without explicit approval.
