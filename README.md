![react-use-test logo](https://github.com/dusanjovanov/react-use-test/blob/master/logo.png 'react-use-test logo')

⚗️ Hook for testing React component state and functions
<br />

[![npm](https://img.shields.io/npm/v/react-use-test?color=%231E90FF&label=npm&style=for-the-badge)](https://www.npmjs.com/package/react-use-test)

## **Installation**

```bash
npm install react-use-test
```

```bash
yarn add react-use-test
```

> With standard React testing (@testing-library/react) you don't have access to the internals of React components (state, functions, refs etc.). This hook aims to solve that.

> The hook only supports the Jest framework for now.

## **Usage**

```tsx
// call useTest in your component and pass it the action and observe functions

import { useTest } from 'react-use-test';

const Counter = () => {
  const [count, setCount] = React.useState(0);

  const increment = () => setCount(count + 1);

  // useTest only executes it's code in the jest environment
  useTest(
    done => {
      increment();
      // call done when you're done preparing for the test
      done();
    },
    () => {
      // jest provides expect as a global function
      expect(count).toBe(1);
    }
  );

  return (
    <div>
      <span>{count}</span>
      <button onClick={increment}>+</button>
    </div>
  );
};

// then inside your test file

import { render } from '@testing-library/react';
import { Counter } from '../components/Counter';

// if something throws an error inside useTest, the test will fail
it('Counter', () => {
  render(<Counter />);
});

// this library also exports a helper for simulating a change event on inputs

import { fireChangeEvent } from 'react-use-test';

export const TextField = () => {
  const [value, setValue] = React.useState('');

  useTest(
    done => {
      const element = document.getElementById('text');
      if (element) {
        fireChangeEvent(element, 'some text');
        done();
      }
    },
    () => {
      expect(value).toBe('some text');
    }
  );

  return (
    <input
      id="text"
      type="text"
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  );
};
```

## **Usage with Typescript**

You need to declare the `expect` global somewhere in your application code like this

```tsx
declare var expect: any;
```
