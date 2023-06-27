import prisma from '@/src/libs/prismadb';

type GetReservationsProps = {
  listingId?: string;
  userId?: string;
  authorId?: string;
};

export default async function getReservations(params: GetReservationsProps) {
  try {
    const { authorId, listingId, userId } = params;

    const query: any = {};

    if (listingId) {
      query.listingId = listingId;
    }

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.listing = { userId: authorId };
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return reservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
