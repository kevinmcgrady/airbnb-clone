import { Reservation } from '@prisma/client';
import { eachDayOfInterval } from 'date-fns';

export const formatDisableDates = (reservations: Reservation[]): Date[] => {
  let dates: Date[] = [];

  reservations.forEach((reservation) => {
    const range = eachDayOfInterval({
      start: new Date(reservation.startDate),
      end: new Date(reservation.endDate),
    });

    dates = [...dates, ...range];
  });

  return dates;
};
