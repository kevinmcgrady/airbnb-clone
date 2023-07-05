import { authMock } from '@/src/jest/next-auth';
import { prismaMock } from '@/src/jest/prisma';

import getFavoriteListings from './getFavoriteListings';

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

const mockUser = {
  createdAt: new Date(),
  email: 'kevinmcgrady47@gmail.com',
  favoriteIds: ['id'],
  id: '',
  name: 'kevin',
  image: 'image',
  emailVerified: null,
  updatedAt: new Date(),
  hashedPassword: '',
};

const mockSession = {
  user: {
    email: 'kevinmcgrady47@gmail.com',
  },
};

describe('getFavoriteListings', () => {
  it('should return empty array if no current user', async () => {
    authMock.mockReturnValue(null);

    const actualResult = await getFavoriteListings();
    const expectedResult = new Array();

    expect(actualResult).toEqual(expectedResult);
  });

  it('should return an array of the users favorite listings', async () => {
    authMock.mockReturnValue(mockSession);
    prismaMock.user.findUnique.mockResolvedValue(mockUser);
    prismaMock.listing.findMany.mockResolvedValue([mockListing]);

    const actualResult = await getFavoriteListings();
    const expectedResult = mockListing;

    expect(actualResult).toEqual([expectedResult]);
  });

  it('should return an empty array if the current user has no favorite listings', async () => {
    authMock.mockReturnValue(mockSession);
    prismaMock.user.findUnique.mockResolvedValue(mockUser);
    prismaMock.listing.findMany.mockResolvedValue([]);

    const actualResult = await getFavoriteListings();
    const expectedResult = new Array();

    expect(actualResult).toEqual(expectedResult);
  });

  it('should throw and error', async () => {
    authMock.mockReturnValue(mockSession);
    prismaMock.user.findUnique.mockResolvedValue(mockUser);
    prismaMock.listing.findMany.mockRejectedValueOnce('error');

    await expect(getFavoriteListings()).rejects.toThrowError('error');
  });
});
