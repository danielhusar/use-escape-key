# use-escape-key

> ⚠️ Warning: hooks are not part of a stable React release yet, so use this library only for experiments

[Demo](https://codesandbox.io/s/3v0kkjx315)

### About

`@danielhusar/use-escape-key` is a [react custom-hook](https://reactjs.org/docs/hooks-custom.html) that will execute function when escape key is pressed

### Install

```bash
yarn add @daniel.husar/use-escape-key
```

### API

#### useEscapeKey

This is a hook that lets you execute function when escape key is pressed.

_Usage_

```jsx
import useEscapeKey from '@daniel.husar/use-escape-key';
const Component = (props) => {
  useEscapeKey(() => console.log('I have pressed escape key!'));
}
```

First argument in `useEscapeKey` is function that will be executed when escape key is pressed. The event object is passed into this function as argument.

Second optional argument is object for options:

###### window

Type: `object`
Default: `'window object'`

This is useful if you don't want to bind event to current window, but for example to parent window (window.parent)

###### dependencies

Type: `array`
Default: `[]`

If you use in your callback any values from the outer scope that change over time, you should provide them as dependeincies so callback will get executed with latest values. This get passed as [second argument](https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects) into `useEffect` hook.

## License

MIT © [Daniel Husar](https://github.com/danielhusar)
