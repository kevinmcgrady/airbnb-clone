import { formatDuration } from './formatDuration';

describe('formatDuration', () => {
  it('should return the correct duration for a single day', () => {
    const expectedResult = 1;
    const actualResult = formatDuration(
      new Date('01/01/2023'),
      new Date('01/02/2023'),
    );

    expect(actualResult).toEqual(expectedResult);
  });

  it('should return the correct duration for nultiple days', () => {
    const expectedResult = 7;
    const actualResult = formatDuration(
      new Date('01/01/2023'),
      new Date('01/08/2023'),
    );

    expect(actualResult).toEqual(expectedResult);
  });
});
