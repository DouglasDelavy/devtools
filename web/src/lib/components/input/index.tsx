type InputProps = {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ label, ...rest }: InputProps) => {
  return (
    <div>
      {label && <label className="text-sm font-medium text-neutral-400">{label}</label>}
      <input className="w-full p-1 text-sm bg-neutral-700 text-neutral-300 placeholder:text-neutral-400" {...rest} />
    </div>
  );
};
