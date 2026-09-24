import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const docs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    order: z.number().default(0),
    // Closed set, not a free string: a typo here would otherwise pass validation
    // and produce a page that renders but never appears in any nav section.
    section: z.enum([
      'AI Value Creation Matrix',
      'Best Practices',
      'Claude Code Welcome',
      'Context',
      'First Sessions',
      'Foundations',
      'Getting Started',
      'Good Habits',
      'PE Playbooks',
      'PE Recipes',
      'Power Features',
      'Projects',
      'Resources',
      'Start Here',
      'Worked Example',
    ]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { docs };
