import { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ children, ...rest }: ButtonProps) => {
  return (
    <button
      className="px-2 py-1 2xl:px-4 2xl:py-2 rounded-sm font-medium text-[10px] 2xl:text-sm bg-neutral-700 text-white hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-400"
      {...rest}
    >
      {children}
    </button>
  );
};
