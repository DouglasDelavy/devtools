type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = {
  label?: string;
  options: SelectOption[];
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = ({ options, label, ...rest }: SelectProps) => {
  return (
    <div className="w-full flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-neutral-400">{label}</label>}

      <select
        className="w-full p-1 bg-neutral-700 text-neutral-300 text-sm rounded-sm focus:ring-neutral-500 focus:border-neutral-500"
        {...rest}
      >
        <option value="choose">Choose</option>

        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};
