# Meso Gym — Voice, language and terminology guide (draft v1)

Status: DRAFT — review before applying site-wide or app-wide. This is a writing standard, not permission to publish changes.

## Purpose
Help gym users, personal trainers, gym owners and their clients understand what Meso Gym does, what they should do next, and why it matters. Sound like a knowledgeable, approachable personal trainer: clear, warm, practical and confident without hype.

## Voice
- Friendly, natural, concise and informative. Speak to the reader as "you".
- Explain the benefit before technical detail. Prefer concrete actions to abstract claims.
- Keep important training science accurate; explain specialist terms the first time they matter.
- Avoid robotic language, exaggerated promises, aggressive sales copy and needless jargon.
- Be encouraging without being patronising, blaming or over-familiar.
- Write for an international English-speaking audience. Use consistent UK English spelling provisionally (existing site metadata uses en_GB); confirm locale preference before a broad rewrite.

## Interface rules
- Use sentence case for buttons, sheet titles, tabs, pills, tooltips and notifications unless a proper noun requires capitals.
- Buttons name the action: "Save changes", "Send to client", "Swap exercise". Avoid vague "Continue" where a clearer verb fits.
- Explain consequences before irreversible or wide-scope actions. Distinguish "This session only" from "Rest of the meso" in nearby helper text.
- For errors, say what happened, whether work was saved, and what to do next. Never claim a specific cause (e.g. unsupported server) without evidence.
- Tooltips, (i)/(?) help, FAQ, and empty states should answer the user's likely question directly, not repeat the heading.
- Preserve accessibility labels, meaning, validation, legal text and safety warnings. Do not change programmatic keys or analytics identifiers during copy edits.
- Prefer short labels that fit at 360px; test 360px and 412px, larger layouts, zoom and screen-reader accessible names.
- Distinguish statuses precisely: queued, sent, waiting for client, applied, failed.

## Terminology — proposed starting glossary
| Term | Guidance |
| --- | --- |
| Exercise swap | "Swap exercise" for the action; say whether it changes one session or future sessions. |
| Mesocycle / meso | On first use, "training block (mesocycle)"; use "meso" only where users already know it or space is constrained. |
| RIR | First use: "reps in reserve (RIR)" — how many more good-form reps you could do. |
| Hypertrophy | First use: "muscle growth (hypertrophy)". |
| Coach / trainer | Use "coach" for the in-app role when that is the product label; use "personal trainer" in customer-facing explanations where useful for clarity and search. |
| Client | The person being coached. Don't confuse them with the account owner or gym member. |
| Done / completed | Describe what was actually logged; future swaps must not relabel completed sessions. |

## Examples (illustrative; not yet approved site copy)
- Technical: "Set a weight and RIR target for every set."
  Clearer: "See your target weight and how many reps to leave in reserve for each set."
- Vague: "An error occurred."
  Better: "Couldn't send your changes. They're still saved here. Check your connection and try again."
- Ambiguous: "Apply to meso."
  Better: "Use this exercise for the rest of your training block."

## Review and implementation process
1. Inventory actual customer-facing strings across all site pages and assets, including metadata, structured data, FAQ, help, popups and forms.
2. Agree voice and terminology against real examples. Preserve SEO intent without keyword stuffing or misleading claims.
3. Edit the website in small, reviewable batches; inspect all relevant routes and interactions.
4. Once approved, bring the guide into the app repository and inventory coach/client, hypertrophy/cardio, onboarding, buttons, pills, (i)/(?) help, errors, notifications, email templates and remote content.
5. For every batch, verify responsive wrapping, accessibility, interaction, navigation, error/empty states, tests and build. Keep staging and production unchanged until deployment approval.

## Boundaries
This document does not certify that every string has been found. Some text may be generated dynamically or stored outside GitHub. Maintain an explicit coverage register with source paths, surfaces, reviewed status and outstanding gaps.
