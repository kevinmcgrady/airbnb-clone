import { z } from 'zod';

import { getAuthSession } from '@/src/actions/getCurrentUser';
import prisma from '@/src/libs/prismadb';

type Params = {
  reservationId?: string;
};

export async function DELETE(req: Request, { params }: { params: Params }) {
  try {
    const currentUser = await getAuthSession();

    if (!currentUser?.user) {
      return new Response('Not Authorized', { status: 401 });
    }

    const { reservationId } = params;

    const reservation = await prisma.reservation.deleteMany({
      where: {
        id: reservationId,
        OR: [
          { userId: currentUser.user.id },
          { listing: { userId: currentUser.user.id } },
        ],
      },
    });

    return new Response(JSON.stringify(reservation));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }
    return new Response('Could not add to favorites, please try again', {
      status: 500,
    });
  }
}
