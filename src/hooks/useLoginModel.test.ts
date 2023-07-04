import { act,renderHook } from '@testing-library/react-hooks';

import useLoginModel from './useLoginModel';

describe('useLoginModel', () => {
  it('should be closed by default', () => {
    const { result } = renderHook(() => useLoginModel());
    expect(result.current.isOpen).toEqual(false);
  });

  it('should open', () => {
    const { result } = renderHook(() => useLoginModel());

    act(() => {
      result.current.onOpen();
    });

    expect(result.current.isOpen).toEqual(true);
  });

  it('should close', () => {
    const { result } = renderHook(() => useLoginModel());

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
