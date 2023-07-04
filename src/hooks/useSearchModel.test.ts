import { act,renderHook } from '@testing-library/react-hooks';

import useSearchModel from './useSearchModel';

describe('useSearchModel', () => {
  it('should be closed by default', () => {
    const { result } = renderHook(() => useSearchModel());
    expect(result.current.isOpen).toEqual(false);
  });

  it('should open', () => {
    const { result } = renderHook(() => useSearchModel());

    act(() => {
      result.current.onOpen();
    });

    expect(result.current.isOpen).toEqual(true);
  });

  it('should close', () => {
    const { result } = renderHook(() => useSearchModel());

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
