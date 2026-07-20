# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: production-health.spec.ts >> Production health endpoints >> GET /v1/ready returns readiness payload
- Location: e2e/production-health.spec.ts:16:3

# Error details

```
Error: apiRequestContext.get: connect ECONNREFUSED ::1:8787
Call log:
  - → GET http://localhost:8787/v1/ready
    - user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.7827.55 Safari/537.36
    - accept: */*
    - accept-encoding: gzip,deflate,br

```