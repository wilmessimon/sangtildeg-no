import { z } from 'zod';

export const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  about: z.string().min(10, 'Please share a bit more'),
  personality: z.string().optional(),
  favorites: z.string().optional(),
  saying: z.string().optional(),
  memory: z.string().optional(),
  tone: z.enum(['gentle', 'warm', 'reflective', 'other']),
  musicStyle: z.string().optional(),
  contactName: z.string().min(1, 'Your name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  additional: z.string().optional(),
  language: z.enum(['en', 'no']),
});

export type FormData = z.infer<typeof formSchema>;

