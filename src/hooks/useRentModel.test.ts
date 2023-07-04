import { act,renderHook } from '@testing-library/react-hooks';

import useRentModel from './useRentModel';

describe('useRentModel', () => {
  it('should be closed by default', () => {
    const { result } = renderHook(() => useRentModel());
    expect(result.current.isOpen).toEqual(false);
  });

  it('should open', () => {
    const { result } = renderHook(() => useRentModel());

    act(() => {
      result.current.onOpen();
    });

    expect(result.current.isOpen).toEqual(true);
  });

  it('should close', () => {
    const { result } = renderHook(() => useRentModel());

    act(() => {
      result.current.onOpen();
    });

    expect(result.current.isOpen).toEqual(true);

    act(() => {
      result.current.onClose();
    });

    expect(result.current.isOpen).toEqual(false);
  });
});
