import { prismaMock } from '@/src/jest/prisma';

import getReservations from './getReservations';

const mockReservation = {
  id: '',
  userId: '',
  listingId: '',
  startDate: new Date(),
  endDate: new Date(),
  totalPrice: 200,
  createdAt: new Date(),
};

const mockQuery = {
  authorId: 'authorId',
  listingId: 'listingId',
  userId: 'userId',
};

describe('getReservations', () => {
  it('should return reservations', async () => {
    prismaMock.reservation.findMany.mockResolvedValue([mockReservation]);

    const actualResult = await getReservations(mockQuery);

    const expectedResult = [mockReservation];

    expect(actualResult).toEqual(expectedResult);
  });

  it('should throw an error', async () => {
    prismaMock.reservation.findMany.mockRejectedValue('error');

    await expect(getReservations(mockQuery)).rejects.toThrowError('error');
  });
});
