import bcrypt from 'bcrypt';
import { z } from 'zod';

import prisma from '@/app/libs/prismadb';
import { RegisterUserValidator } from '@/app/validators/registerUser';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, password } = RegisterUserValidator.parse(body);
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    return new Response(JSON.stringify(user));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }
    return new Response('Could not create account, please try again', {
      status: 500,
    });
  }
}
