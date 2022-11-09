import React, { useRef, useState } from 'react';

import { fetchNui } from '@lib/nui';

import { ReactComponent as TrashIcon } from '../../../../assets/icons/trash.svg';

const ARROW_UP_KEY_CODE = 'ArrowUp';
const ARROW_DOWN_KEY_CODE = 'ArrowDown';

export const ConsoleScreen = () => {
  const [output, setOutput] = useState<string[]>([]);

  const [history, setHistory] = useState<string[]>([]);
  const [historyPosition, setHistoryPosition] = useState<number>(1);

  const inputRef = useRef<HTMLInputElement>(null);

  const addOutputMessage = (message: string): void => {
    setOutput(current => [...current, message]);
  };

  const clearOutput = (): void => {
    setOutput([]);
  };

  const processInput = (message: string): void => {
    addOutputMessage('> ' + message);
    setHistory(current => [...current, message]);
    setHistoryPosition(history.length + 1);

    fetchNui<any>('console:run', message)
      .then(result => {
        if (!result) return;

        addOutputMessage(result.toString());
      })
      .catch(console.error);
  };

  const setInputValue = (value: string): void => {
    if (!inputRef?.current) return;

    inputRef.current.value = value;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const value = inputRef.current?.value;
    if (value) {
      inputRef.current.value = '';

      switch (value) {
        case 'clear':
          clearOutput();
          break;

        default:
          processInput(value);
          break;
      }
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (history.length <= 0) return;

    if (e.key === ARROW_UP_KEY_CODE) {
      e.preventDefault();

      const currentPosition = Math.min(historyPosition, history.length);
      const position = Math.max(0, currentPosition - 1);

      setInputValue(history[position]);
      setHistoryPosition(position);
    } else if (e.key === ARROW_DOWN_KEY_CODE) {
      e.preventDefault();

      const position = Math.min(history.length, historyPosition + 1);
      if (position < history.length) {
        setInputValue(history[position]);
        setHistoryPosition(position);
      }
    }
  };

  return (
    <>
      <div className="w-full mb-2 p-1 flex justify-between items-center bg-neutral-800">
        <h1 className="font-bold text-neutral-200">Native Console</h1>

        <button className="cursor-pointer" onClick={clearOutput}>
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>

      <div className="p-2 flex flex-col flex-nowrap overflow-auto font-mono bg-neutral-800 ">
        {output.map((value, index) => (
          <span className="whitespace-nowrap" key={index}>
            {value}
          </span>
        ))}

        <form onSubmit={handleSubmit} className="flex justify-center items-center">
          <span>&gt;</span>

          <input
            type="text"
            autoFocus
            spellCheck={false}
            ref={inputRef}
            onKeyDown={onKeyDown}
            className="ml-2 bg-transparent w-full select-none focus:outline-none"
          ></input>
        </form>
      </div>
    </>
  );
};
