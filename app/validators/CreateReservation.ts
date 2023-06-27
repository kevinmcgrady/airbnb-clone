import { z } from 'zod';

export const CreateReservationValidator = z.object({
  totalPrice: z.number(),
  startDate: z.date(),
  endDate: z.date(),
  listingId: z.string(),
});

export type CreateReservationRequest = z.infer<
  typeof CreateReservationValidator
>;
