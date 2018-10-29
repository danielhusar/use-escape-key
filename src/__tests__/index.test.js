jest.mock('react', () => ({
  useEffect: jest.fn(cb => cb()()),
}));

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
    const _window = {
      document: {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      },
    };
    useEscapeKey(() => jest.fn(), { window: _window });
    expect(_window.document.addEventListener).toHaveBeenCalledTimes(1);
    expect(_window.document.removeEventListener).toHaveBeenCalledTimes(1);
  });

  test('it pass dependency to useEffect', () => {
    const dependencies = ['foo'];
    useEscapeKey(() => jest.fn(), { dependencies });
    expect(useEffect).toHaveBeenCalledWith(expect.any(Function), dependencies);
  });

  test('it check that dependency is an array', () => {
    console.warn = jest.fn();
    const dependencies = 'foo';
    useEscapeKey(() => jest.fn(), { dependencies });
    expect(useEffect).toHaveBeenCalledWith(expect.any(Function), []);
    expect(console.warn).toHaveBeenCalledWith('Dependencies must be an array!');
  });
});
