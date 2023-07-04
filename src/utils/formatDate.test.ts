import { formatDate } from './formatDate';

describe('formatDate', () => {
  it('should format a given date corretly', () => {
    const expectedResult = 'Oct 10, 2023 - Oct 11, 2023';

    const actualResult = formatDate(
      new Date('10/10/2023'),
      new Date('10/11/2023'),
    );

    expect(expectedResult).toEqual(actualResult);
  });
});
