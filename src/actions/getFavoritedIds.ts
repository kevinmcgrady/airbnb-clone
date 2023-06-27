import getCurrentUser from '@/src/actions/getCurrentUser';
import prisma from '@/src/libs/prismadb';

export default async function getFavoritedIds() {
  const currentUser = await getCurrentUser();

  try {
    if (!currentUser) {
      return [];
    }

    const dbUser = await prisma.user.findUnique({
      where: {
        id: currentUser?.id,
      },
    });

    return dbUser?.favoriteIds || [];
  } catch (error: any) {
    throw new Error(error);
  }
}
