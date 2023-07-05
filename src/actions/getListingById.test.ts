import { prismaMock } from '../jest/prisma';
import getListingbyId from './getListingById';

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

describe('getListingById', () => {
  it('should return the correct listing', async () => {
    prismaMock.listing.findUnique.mockResolvedValue(mockListing);

    const actualValue = await getListingbyId('');
    expect(actualValue).toEqual(mockListing);
  });

  it('should return null if no listing', async () => {
    prismaMock.listing.findUnique.mockResolvedValue(null);

    const actualValue = await getListingbyId('');
    expect(actualValue).toEqual(null);
  });

  it('should throw an error', async () => {
    prismaMock.listing.findUnique.mockRejectedValueOnce('error');

    await expect(getListingbyId('')).rejects.toThrowError('error');
  });
});
