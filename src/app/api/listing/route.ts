import { z } from 'zod';

import getCurrentUser from '@/src/actions/getCurrentUser';
import prisma from '@/src/libs/prismadb';
import { CreateListingValidator } from '@/src/validators/CreateListing';

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new Response('Not Authorized', { status: 401 });
    }

    const body = await req.json();
    const {
      bathroomCount,
      category,
      description,
      guestCount,
      imageSrc,
      price,
      roomCount,
      title,
      location,
    } = CreateListingValidator.parse(body);

    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        roomCount,
        guestCount,
        price: parseInt(price),
        locationValue: location?.value as string,
        category,
        bathroomCount,
        imageSrc,
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
