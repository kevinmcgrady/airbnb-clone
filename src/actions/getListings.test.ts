import { prismaMock } from '@/src/jest/prisma';

import getListings from './getListings';

const mockListing = {
  bathroomCount: 1,
  category: '',
  createdAt: new Date(),
  guestCount: 3,
  description: '',
  id: '',
  imageSrc: '',
  locationValue: '',
  price: 100,
  roomCount: 3,
  title: '',
  userId: '',
};

describe('getListings', () => {
  it('should return listings', async () => {
    prismaMock.listing.findMany.mockResolvedValue([mockListing]);

    const expectedResult = [mockListing];

    const actualResult = await getListings({
      userId: 'id',
      bathroomCount: 1,
      category: 'category',
      endDate: '10-12-2023',
      guestCount: 2,
      locationValue: 'location',
      roomCount: 3,
      startDate: '10-12-2023',
    });

    expect(expectedResult).toEqual(actualResult);
  });

  it('should throw error', async () => {
    prismaMock.listing.findMany.mockRejectedValueOnce('error');

    await expect(
      getListings({
        userId: 'id',
        bathroomCount: 1,
        category: 'category',
        endDate: '10-12-2023',
        guestCount: 2,
        locationValue: 'location',
        roomCount: 3,
        startDate: '10-12-2023',
      }),
    ).rejects.toThrow('error');
  });
});
