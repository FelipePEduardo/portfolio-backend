import { z } from 'zod';

export const UserInformationSchema = z.object({
  login: z.string(),
  id: z.number(),
  node_id: z.string(),
  avatar_url: z.string().url(),
  gravatar_id: z.string(),
  url: z.string().url(),
  html_url: z.string().url(),
  followers_url: z.string().url(),
  following_url: z.string(),
  gists_url: z.string(),
  starred_url: z.string(),
  subscriptions_url: z.string().url(),
  organizations_url: z.string().url(),
  repos_url: z.string().url(),
  events_url: z.string(),
  received_events_url: z.string().url(),
  type: z.literal('User'),
  user_view_type: z.literal('public'),
  site_admin: z.boolean(),
  name: z.string(),
  company: z.string().nullable(),
  blog: z.string().url().nullable(),
  location: z.string().nullable(),
  email: z.string().email().nullable(),
  hireable: z.boolean().nullable(),
  bio: z.string().nullable(),
  twitter_username: z.string().nullable(),
  public_repos: z.number(),
  public_gists: z.number(),
  followers: z.number(),
  following: z.number(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type UserInformationDto = z.infer<typeof UserInformationSchema>;
