/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as projects from "../projects.js";
import type * as resend from "../resend.js";
import type * as sprints from "../sprints.js";
import type * as tables_index from "../tables/index.js";
import type * as tables_projects from "../tables/projects.js";
import type * as tables_sprints from "../tables/sprints.js";
import type * as tables_tasks from "../tables/tasks.js";
import type * as tables_teams from "../tables/teams.js";
import type * as tables_userConfiguration from "../tables/userConfiguration.js";
import type * as tables_users from "../tables/users.js";
import type * as tasks from "../tasks.js";
import type * as teams from "../teams.js";
import type * as templates_invite from "../templates/invite.js";
import type * as userConfiguration from "../userConfiguration.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  projects: typeof projects;
  resend: typeof resend;
  sprints: typeof sprints;
  "tables/index": typeof tables_index;
  "tables/projects": typeof tables_projects;
  "tables/sprints": typeof tables_sprints;
  "tables/tasks": typeof tables_tasks;
  "tables/teams": typeof tables_teams;
  "tables/userConfiguration": typeof tables_userConfiguration;
  "tables/users": typeof tables_users;
  tasks: typeof tasks;
  teams: typeof teams;
  "templates/invite": typeof templates_invite;
  userConfiguration: typeof userConfiguration;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
