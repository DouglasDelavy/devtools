import { useRef } from 'react';

import { ReactComponent as SmallArrowRightIcon } from '../../../assets/icons/small_arrow_right.svg';
import { ReactComponent as SmallArrowLeftIcon } from '../../../assets/icons/small_arrow_left.svg';

type ArrowInputProps = {
  label?: string;

  onChange: (value: number) => void;

  initialValue?: number;
  max?: number;
  min?: number;
};

const DEFAULT_INITIAL_VALUE = 0;
const NUMBER_MAX_VALUE = Number.MAX_VALUE;
const NUMBER_MIN_VALUE = Number.NEGATIVE_INFINITY;

export const ArrowInput = ({
  label,
  onChange,
  initialValue = DEFAULT_INITIAL_VALUE,
  max = NUMBER_MAX_VALUE,
  min = NUMBER_MIN_VALUE,
}: ArrowInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const changeValue = (value: number): void => {
    if (value > max) value = min;
    if (value < min) value = max;

    const inputValue = inputRef.current?.value;
    if (inputValue) {
      inputRef.current.value = String(value);

      onChange(value);
    }
  };

  const handleIncrementValue = (): void => {
    const value = inputRef.current?.value;
    if (!value) return;

    changeValue(parseInt(value) + 1);
  };

  const handleDecrementValue = (): void => {
    const value = inputRef.current?.value;
    if (!value) return;

    changeValue(parseInt(value) - 1);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = parseInt(e.target.value);

    changeValue(isNaN(value) ? DEFAULT_INITIAL_VALUE : value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    switch (e.key) {
      case 'ArrowLeft':
        handleDecrementValue();
        break;

      case 'ArrowRight':
        handleIncrementValue();
        break;

      default:
        return;
    }

    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm text-neutral-200">{label}</label>}

      <div className="flex items-center gap-2">
        <button onClick={handleDecrementValue}>
          <SmallArrowLeftIcon className="w-3 h-3" />
        </button>

        <input
          type="text"
          ref={inputRef}
          defaultValue={initialValue}
          onKeyDown={handleKeyDown}
          onChange={handleValueChange}
          className="w-full px-1 text-sm text-center bg-neutral-700 text-neutral-300 placeholder:text-neutral-400"
        />

        <button onClick={handleIncrementValue}>
          <SmallArrowRightIcon className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
