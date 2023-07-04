import { act,renderHook } from '@testing-library/react-hooks';

import useRegisterModel from './useRegisterModel';

describe('useRegisterModel', () => {
  it('should be closed by default', () => {
    const { result } = renderHook(() => useRegisterModel());
    expect(result.current.isOpen).toEqual(false);
  });

  it('should open', () => {
    const { result } = renderHook(() => useRegisterModel());

    act(() => {
      result.current.onOpen();
    });

    expect(result.current.isOpen).toEqual(true);
  });

  it('should close', () => {
    const { result } = renderHook(() => useRegisterModel());

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
