# ADR-098: Experience Platform Completion

**Status:** Accepted  
**Date:** 2026-07-12  
**Sprint:** EPIC 21 — Experience Platform

## Decision

Extend CMS with migration `0010_experience_platform`: localization (`cms_locales`, `cms_translations`), layout presets, forms/submissions, approval workflows, scheduled announcements, email/notification templates, org branding overrides, CMS analytics events, and quality reports. Implement validators for WCAG accessibility, link scanning, and performance heuristics. Expose all capabilities via `/v1/cms/*` and `@nexus/sdk-cms` experience client. Studio **Experience Hub** consolidates navigation, footer, form, workflow, SEO/OG, localization, branding, announcements, templates, quality, and analytics builders.

## Consequences

Administrators manage the full public experience from Command Center. Website consumes announcements, SEO/OG metadata, and analytics heatmap hooks without hardcoded content.

*Related: ADR-097, ADR-085*
