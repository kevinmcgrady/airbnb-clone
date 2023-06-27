import { z } from 'zod';

import getCurrentUser from '@/src/actions/getCurrentUser';
import prisma from '@/src/libs/prismadb';

type Params = {
  listingId: string;
};

export async function POST(req: Request, { params }: { params: Params }) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new Response('Not Authorized', { status: 401 });
    }

    const { listingId } = params;

    const databaseUser = await prisma.user.findUnique({
      where: {
        id: currentUser.id,
      },
    });

    let favoriteIds = databaseUser?.favoriteIds || [];

    if (!favoriteIds.includes(listingId)) {
      favoriteIds?.push(listingId);
    } else {
      favoriteIds = favoriteIds?.filter((id) => id !== listingId);
    }

    const user = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favoriteIds,
      },
    });

    return new Response(JSON.stringify(user));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }
    return new Response('Could not add to favorites, please try again', {
      status: 500,
    });
  }
}
