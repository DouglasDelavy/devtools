type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea = ({ ...rest }: TextAreaProps) => {
  return <textarea className="w-full bg-neutral-700 text-sm text-neutral-200" {...rest} />;
};
