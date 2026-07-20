# ADR-117: NEXUS AI Platform

## Status
Accepted — EPIC 31

## Context
Every NEXUS application (Website, Studio, Marketplace, Cloud, SDK, Digital Twin, Manufacturing, Fleet, Command Center) must share one AI brain. Prior to EPIC 31, cloud AI lived in an in-memory `@nexus-cloud/ai-services` package disconnected from the API, while Studio used a local `nexus-ai` runtime via `@nexus/sdk-ai`.

## Decision
Introduce `@nexus-cloud/intelligence` as the single cloud AI platform:

- **Assistants**: unified, command_center, developer_copilot, sponsor, behavior, sdk, documentation, marketplace, manufacturing, fleet
- **Model router**: OpenAI, Anthropic, Gemini, with structured stub fallback
- **RAG pipeline**: PostgreSQL full-text search over `ai_document_chunks`
- **Memory & conversations**: persisted in `ai_conversations`, `ai_messages`, `ai_memory_entries`
- **Tool registry & prompt library**: shared constants consumed by all clients
- **API**: `/v1/intelligence/*` and `/v1/organizations/:id/intelligence/*`

`@nexus-cloud/ai-services` becomes a thin facade delegating to intelligence — no duplicate AI systems.

Local `nexus-ai` remains the offline/runtime stack; `@nexus/sdk-ai` adds `createCloudAiClient` and `createHybridAiClient` to bridge both.

## Consequences
- All cloud AI traffic flows through one service factory: `createIntelligenceService(db, config)`
- SDK and Studio auto-prefer cloud when `nexus-cloud-url`, auth token, and `nexus-org-id` are configured
- Model keys remain optional; platform operates in stub mode without external LLM credentials
