# ADR-120: Automation Platform

## Status
Accepted — EPIC 31

## Context
EPIC 31 requires workflow automation, natural language commands, and an agent framework integrated with the unified AI platform.

## Decision
Implement automation in `createWorkflowService`:

- **Workflows** stored in `ai_workflows` with JSON step definitions (`prompt`, `search`, `notify`)
- **Runner** executes steps sequentially, updating `lastRunAt`
- **NL command parser** maps text to intents (`search`, `run_workflow`, `fleet_status`, `marketplace_query`, `chat`)
- **Tool registry** links commands to registered tools (`search_docs`, `schedule_workflow`, etc.)

Command Center **Workflow Automation** panel lists workflows, parses commands, and triggers runs via API.

Connection Orchestrator registers `nexus-intelligence` as the required service for `ai_services` readiness (replacing direct OpenAI dependency).

## Consequences
- Workflows are org-scoped and DB-backed
- NL commands are rule-based v1; future agents can wrap the same tool registry
- Cron/scheduling for workflows deferred to future work
