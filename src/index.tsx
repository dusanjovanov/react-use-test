import * as React from 'react';

type ActionFn = (done: () => void) => void;

type ObserveFn = () => void;

export function useTest(action: ActionFn, observe: ObserveFn) {
  const [isDone, setIsDone] = React.useState(false);

  const done = () => setIsDone(true);

  React.useEffect(() => {
    if (process.env.JEST_WORKER_ID === undefined) return;
    if (typeof action === 'function') {
      action(done);
    }
  }, []);

  React.useEffect(() => {
    if (!isDone) return;
    if (typeof observe === 'function') {
      observe();
    }
  });
}

/**
 * This works for inputs that have a value attribute of type string (text, number, email, color, date, url etc.)
 * @param element An HTMLInputElement object
 * @param value A string
 */
export function fireChangeEvent(element: HTMLInputElement, value: string) {
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    'value'
  )?.set;
  if (nativeInputValueSetter) {
    nativeInputValueSetter.call(element, value);
    element.dispatchEvent(
      new Event('change', { bubbles: true, cancelable: true })
    );
  }
}
