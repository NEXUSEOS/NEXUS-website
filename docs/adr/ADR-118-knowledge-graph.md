# ADR-118: Knowledge Graph

## Status
Accepted — EPIC 31

## Context
Organization knowledge must be queryable across assistants, RAG, and Command Center explorers. EPIC 31 requires semantic search, document indexing, code indexing, and robot knowledge in one graph.

## Decision
Persist knowledge in PostgreSQL:

| Table | Purpose |
|-------|---------|
| `ai_knowledge_nodes` | Concepts, docs, robots, packages |
| `ai_knowledge_edges` | Typed relations with weights |
| `ai_document_chunks` | RAG chunks with generated `tsvector` |

`createKnowledgeGraphService` exposes add/list/neighbors/getGraph. RAG uses `createRagPipeline` for indexing and full-text semantic search. Command Center **Knowledge Explorer** panel surfaces both graph nodes and search results.

## Consequences
- Knowledge is organization-scoped and durable
- Vector search uses PostgreSQL `tsvector` (no separate vector DB required for v1)
- Future work: embedding-based search, cross-org federation
