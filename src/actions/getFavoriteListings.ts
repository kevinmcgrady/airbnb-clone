import getCurrentUser from '@/src/actions/getCurrentUser';
import prisma from '@/src/libs/prismadb';

export default async function getFavoritedListings() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const dbUser = await prisma.user.findUnique({
      where: {
        id: currentUser.id,
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
