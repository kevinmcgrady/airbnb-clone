import { z } from 'zod';

export const RegisterUserValidator = z.object({
  name: z.string().min(3, 'Name must be more than 3 chars.'),
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().min(8, 'Password must be more than 8 chars.'),
});

export type RegisterUserRequest = z.infer<typeof RegisterUserValidator>;
