jest.mock('react', () => {
  const _cb = [];

  return {
    useEffect: jest.fn(cb => cb()()),
  };
});

const { useEffect } = require('react');
const useEscapeKey = require('../');

describe('useEscapeKey', () => {
  test('it setup the events', () => {
    window.document.addEventListener = jest.fn();
    window.document.removeEventListener = jest.fn();
    useEscapeKey(() => jest.fn());
    expect(window.document.addEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));
    expect(window.document.addEventListener).toHaveBeenCalledTimes(1);
    expect(window.document.removeEventListener).toHaveBeenCalledWith(
      'keydown',
      expect.any(Function)
    );
    expect(window.document.removeEventListener).toHaveBeenCalledTimes(1);
  });

  test('it setup the events with custom window', () => {
    const win = {
      document: {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      },
    };
    useEscapeKey(() => jest.fn(), { window: win });
    expect(win.document.addEventListener).toHaveBeenCalledTimes(1);
    expect(win.document.removeEventListener).toHaveBeenCalledTimes(1);
  });

  test('it pass dependency to useEffect', () => {
    const dependencies = ['foo'];
    useEscapeKey(() => jest.fn(), { dependencies });
    expect(useEffect).toHaveBeenCalledWith(expect.any(Function), dependencies);
  });
});
