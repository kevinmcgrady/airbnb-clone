import { act,renderHook } from '@testing-library/react-hooks';

import useCountries from './useCountries';

describe('useCountries', () => {
  const { result } = renderHook(() => useCountries());

  it('should return all countries', () => {
    act(() => {
      const actualResult = result.current.getAll();
      const expectedResult = {
        flag: '🇿🇼',
        label: 'Zimbabwe',
        latlng: [-20, 30],
        region: 'Africa',
        value: 'ZW',
      };
      expect(actualResult).toContainEqual(expectedResult);
    });
  });

  it('should return one country', () => {
    act(() => {
      const actualResult = result.current.getByValue('ZW');
      const expectedResult = {
        flag: '🇿🇼',
        label: 'Zimbabwe',
        latlng: [-20, 30],
        region: 'Africa',
        value: 'ZW',
      };

      expect(actualResult).toEqual(expectedResult);
    });
  });
});
