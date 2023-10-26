import { forwardRef } from 'react';

type SwitchProps = {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
};

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, checked, onCheckedChange, disabled }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      if (!onCheckedChange) return;

      onCheckedChange(event.target.checked);
    };

    return (
      <label className="inline-flex relative items-center cursor-pointer">
        <input
          ref={ref}
          type="checkbox"
          className="sr-only peer"
          disabled={disabled}
          checked={checked}
          onChange={handleChange}
        />
        <div className="w-11 h-6 bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />

        {label && <p className="ml-1 text-sm text-neutral-300">{label}</p>}
      </label>
    );
  },
);
