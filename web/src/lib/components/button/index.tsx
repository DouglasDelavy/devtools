import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonProps = {
  children: ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ children, className, ...rest }: ButtonProps) => {
  return (
    <button
      className={twMerge(
        'px-2 py-1 2xl:px-4 2xl:py-2 rounded-sm font-medium text-[10px] 2xl:text-sm bg-neutral-700 text-white hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-400',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
