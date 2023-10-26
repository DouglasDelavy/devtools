import { useRef } from 'react';
import classnames from 'classnames';

import { precision } from '@lib/utils/math';

type NumberInputProps = {
  label: string;

  value: number;
  onChange: (value: number) => void;

  max?: number;
  min?: number;
  className?: string;
};

const NUMBER_MAX_VALUE = Number.MAX_VALUE;
const NUMBER_MIN_VALUE = Number.NEGATIVE_INFINITY;

export const NumberInput = ({
  label,
  value,
  onChange,
  className,
  max = NUMBER_MAX_VALUE,
  min = NUMBER_MIN_VALUE,
}: NumberInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const valueNumber = precision(value);

  const changeValue = (value: number): void => {
    if (value > max || value < min) return;

    onChange(value);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    changeValue(parseFloat(e.target.value) || 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    switch (e.key) {
      case 'ArrowUp':
        changeValue(value + 1);
        break;

      case 'ArrowDown':
        changeValue(value - 1);
        break;

      default:
        return;
    }

    e.preventDefault();
    e.stopPropagation();
  };

  const handleWheel = ({ deltaY }: React.WheelEvent<HTMLInputElement>) => {
    changeValue(value + deltaY * 0.001);
  };

  return (
    <div className="flex items-center gap-1">
      {label && <label className="text-sm text-neutral-200 px-1">{label}</label>}
      <input
        ref={inputRef}
        type="text"
        value={valueNumber}
        onChange={handleValueChange}
        onKeyDown={handleKeyDown}
        onWheel={handleWheel}
        className={classnames(
          'w-full px-1 text-sm bg-neutral-700 text-neutral-300 placeholder:text-neutral-400',
          className,
        )}
      />
    </div>
  );
};
