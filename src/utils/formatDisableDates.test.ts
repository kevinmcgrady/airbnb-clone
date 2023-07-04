import { Reservation } from '@prisma/client';

import { formatDisableDates } from './formatDisableDates';

describe('formatDisableDates', () => {
  it('should should resturn a single booked date', () => {
    const reservationsOneDay: Reservation[] = [
      {
        createdAt: new Date(),
        endDate: new Date('01/01/2023'),
        id: 'id',
        listingId: 'listingId',
        startDate: new Date('01/01/2023'),
        totalPrice: 10,
        userId: 'userID',
      },
    ];

    const expectedResult = [new Date('01/01/2023')];
    const actualResult = formatDisableDates(reservationsOneDay);

    expect(expectedResult).toEqual(actualResult);
  });

  it('should return multiple booking dates', () => {
    const reservationsMultipleDays: Reservation[] = [
      {
        createdAt: new Date(),
        endDate: new Date('01/02/2023'),
        id: 'id',
        listingId: 'listingId',
        startDate: new Date('01/01/2023'),
        totalPrice: 10,
        userId: 'userID',
      },
    ];

    const expectedResult = [new Date('01/01/2023'), new Date('01/02/2023')];
    const actualResult = formatDisableDates(reservationsMultipleDays);

    expect(expectedResult).toEqual(actualResult);
  });

  it('should return multiple booking dates for more than one reservation', () => {
    const reservationsMultipleDays: Reservation[] = [
      {
        createdAt: new Date(),
        endDate: new Date('01/02/2023'),
        id: 'id',
        listingId: 'listingId',
        startDate: new Date('01/01/2023'),
        totalPrice: 10,
        userId: 'userID',
      },
      {
        createdAt: new Date(),
        endDate: new Date('02/02/2023'),
        id: 'id',
        listingId: 'listingId',
        startDate: new Date('02/01/2023'),
        totalPrice: 10,
        userId: 'userID',
      },
    ];

    const expectedResult = [
      new Date('01/01/2023'),
      new Date('01/02/2023'),
      new Date('02/01/2023'),
      new Date('02/02/2023'),
    ];
    const actualResult = formatDisableDates(reservationsMultipleDays);

    expect(expectedResult).toEqual(actualResult);
  });
});
