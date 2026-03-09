import { defineCollection, z } from "astro:content";

const art = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    image: z.string().optional(),
    alt: z.string().optional()
  })
});

const words = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    excerpt: z.string().optional()
  })
});

const make = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    image: z.string().optional(),
    process: z.boolean().optional()
  })
});

export const collections = { art, words, make };
