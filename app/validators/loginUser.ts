import { z } from 'zod';

export const LoginUserValidator = z.object({
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().min(8, 'Password must be more than 8 chars.'),
});

export type LoginUserRequest = z.infer<typeof LoginUserValidator>;
