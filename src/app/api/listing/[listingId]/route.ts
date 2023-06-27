import { z } from 'zod';

import getCurrentUser from '@/src/actions/getCurrentUser';
import prisma from '@/src/libs/prismadb';

type Params = {
  listingId?: string;
};

export async function DELETE(req: Request, { params }: { params: Params }) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new Response('Not Authorized', { status: 401 });
    }

    const { listingId } = params;

    const listing = await prisma.listing.deleteMany({
      where: {
        id: listingId,
        userId: currentUser.id,
      },
    });

    return new Response(JSON.stringify(listing));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }
    return new Response('Could not create account, please try again', {
      status: 500,
    });
  }
}
