type CheckBoxProps = {
  label?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const CheckBox = ({ label, ...rest }: CheckBoxProps) => {
  return (
    <div className="flex items-center">
      <input
        className="w-3.5 h-3.5 text-neutral-300 bg-neutral-700 border-neutral-300 focus:ring-neutral-500 focus:ring-2"
        {...rest}
        type="checkbox"
      />

      {label && <label className="ml-2 text-xs font-medium text-gray-900 dark:text-gray-300">{label}</label>}
    </div>
  );
};
