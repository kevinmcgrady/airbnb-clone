import prisma from '@/src/libs/prismadb';

import { getAuthSession } from './getCurrentUser';

export default async function getFavoritedIds() {
  const currentUser = await getAuthSession();

  try {
    if (!currentUser?.user) {
      return [];
    }

    const dbUser = await prisma.user.findUnique({
      where: {
        id: currentUser?.user.id,
      },
    });

    return dbUser?.favoriteIds || [];
  } catch (error: any) {
    throw new Error(error);
  }
}
