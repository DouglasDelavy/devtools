import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({ className, ...rest }, ref) => {
  return (
    <textarea ref={ref} className={twMerge('w-full bg-neutral-700 text-sm text-neutral-200', className)} {...rest} />
  );
});
