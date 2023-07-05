import { mockReset } from 'jest-mock-extended';
import { getServerSession } from 'next-auth/next';

jest.mock('next-auth/next', () => {
  return {
    __esModule: true,
    getServerSession: jest.fn(),
  };
});

beforeEach(() => {
  mockReset(authMock);
});

export const authMock = getServerSession as jest.Mock;
