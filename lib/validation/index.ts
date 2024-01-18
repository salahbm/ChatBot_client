import { z } from 'zod';

export const formSchemaSignUp = z.object({
  username: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters.' })
    .max(50, { message: 'Name cannot exceed 50 characters.' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' }),
  passwordConfirm: z.string(),
});

export const formSchemaSignIn = z.object({
  email: z
    .string()
    .min(1, { message: 'This field has to be filled.' })
    .email('This is not a valid email.'),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' }),
});
