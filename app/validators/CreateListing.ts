import { z } from 'zod';

export const CreateListingValidator = z.object({
  category: z.string(),
  location: z
    .object({
      flag: z.string(),
      label: z.string(),
      latlng: z.array(z.number()),
      region: z.string(),
      value: z.string(),
    })
    .nullish(),
  guestCount: z.number().min(1, 'Guest count must be more than 1'),
  roomCount: z.number().min(1, 'Room count must be more than 1'),
  bathroomCount: z.number().min(1, 'Bathroom count must be more than 1'),
  imageSrc: z.string(),
  price: z.string().min(1, 'Price must be more than £1'),
  title: z.string().min(10, 'The title must be more than 10 chars'),
  description: z.string().min(20, 'A description must be more than 20'),
});

export type CreateListingRequest = z.infer<typeof CreateListingValidator>;
