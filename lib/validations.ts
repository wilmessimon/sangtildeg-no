import { z } from 'zod';

export const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  threeWords: z.string().min(3, 'Please describe the person'),
  story: z.string().min(20, 'Please share more about the person'),
  mustHave: z.string().optional(),
  mood: z.enum(['gentle', 'warm', 'narrative', 'surprise']),
  additional: z.string().optional(),
  contactName: z.string().min(1, 'Your name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  language: z.enum(['en', 'no']),
});

export type FormData = z.infer<typeof formSchema>;

