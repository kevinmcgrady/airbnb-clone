import { z } from 'zod';

import { getAuthSession } from '@/src/actions/getCurrentUser';
import prisma from '@/src/libs/prismadb';
import { CreateReservationValidator } from '@/src/validators/CreateReservation';

export async function POST(req: Request) {
  try {
    const currentUser = await getAuthSession();

    if (!currentUser?.user) {
      return new Response('Not Authorized', { status: 401 });
    }

    const body = await req.json();

    const formattedBody = {
      endDate: new Date(body.endDate),
      startDate: new Date(body.startDate),
      listingId: body.listingId,
      totalPrice: body.totalPrice,
    };
    const { endDate, listingId, startDate, totalPrice } =
      CreateReservationValidator.parse(formattedBody);

    const listingReservation = await prisma.listing.update({
      where: {
        id: listingId,
      },
      data: {
        reservations: {
          create: {
            userId: currentUser.user.id,
            startDate,
            endDate,
            totalPrice,
          },
        },
      },
    });

    return new Response(JSON.stringify(listingReservation));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }
    return new Response('Could not add to favorites, please try again', {
      status: 500,
    });
  }
}
