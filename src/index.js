const { useEffect } = require('react');

const ESCAPE_KEY = 27;
const _dependencies = [];
const _window = window;

const useEscapeKey = (callback, { dependencies = _dependencies, window = _window } = {}) => {
  useEffect(() => {
    const onKeyPress = event => event.keyCode === ESCAPE_KEY && callback(event);

    window.document.addEventListener('keydown', onKeyPress);
    return () => {
      window.document.removeEventListener('keydown', onKeyPress);
    };
  }, dependencies);
};

module.exports = useEscapeKey;
