import { routes as platformRoutes } from '@nexus/config'
import { websiteRoutes } from './websiteRoutes'

/** Merged platform + website routes (runtime). */
export const routes = {
  ...platformRoutes,
  ...websiteRoutes,
}

export type WebsiteRouteKey = keyof typeof websiteRoutes

export type { RouteConfig } from '@nexus/config'
