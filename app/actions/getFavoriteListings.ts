import prisma from '@/app/libs/prismadb';

import { getAuthSession } from './getCurrentUser';

export default async function getFavoritedListings() {
  try {
    const currentUser = await getAuthSession();

    if (!currentUser?.user) {
      return [];
    }

    const dbUser = await prisma.user.findUnique({
      where: {
        id: currentUser.user.id,
      },
    });

    const favoriteListings = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(dbUser?.favoriteIds || [])],
        },
      },
    });

    return favoriteListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
