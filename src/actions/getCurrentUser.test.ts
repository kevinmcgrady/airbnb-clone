import { prismaMock } from '@/src/jest/prisma';

import { authMock } from '../jest/next-auth';
import getCurrentUser from './getCurrentUser';

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

describe('getCurrentUser', () => {
  it('should return the current user', async () => {
    authMock.mockResolvedValue(mockSession);
    prismaMock.user.findUnique.mockResolvedValue(mockUser);

    const expectedResult = mockUser;
    const actualResult = await getCurrentUser();

    expect(actualResult).toEqual(expectedResult);
  });

  it('should return null if no session', async () => {
    const expectedResult = null;
    const actualResult = await getCurrentUser();

    expect(actualResult).toEqual(expectedResult);
  });

  it('should return null if no user returned from db', async () => {
    authMock.mockResolvedValue(mockSession);
    prismaMock.user.findUnique.mockResolvedValue(null);

    const expectedResult = null;
    const actualResult = await getCurrentUser();

    expect(actualResult).toEqual(expectedResult);
  });

  it('should throw an error', async () => {
    authMock.mockResolvedValue(mockSession);
    prismaMock.user.findUnique.mockRejectedValueOnce('error');

    expect(await getCurrentUser()).toEqual(null);
  });
});
