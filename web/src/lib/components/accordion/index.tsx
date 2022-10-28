import { useState, ReactNode, HTMLAttributes } from 'react';

import { ReactComponent as ArrowRightIcon } from '../../../assets/icons/arrow_right.svg';
import { ReactComponent as ArrowDownIcon } from '../../../assets/icons/arrow_down.svg';

type AccordionProps = {
  title: string;
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export const Accordion = ({ title, children, ...rest }: AccordionProps) => {
  const [expanded, setExpanded] = useState(false);

  const handleChangeExpanded = (): void => {
    setExpanded(state => !state);
  };

  return (
    <div className="px-3 py-1 w-full bg-neutral-800 cursor-pointer" onClick={handleChangeExpanded} {...rest}>
      <div className="flex items-center gap-2 text-neutral-200">
        {expanded ? <ArrowDownIcon className="w-3 h-3" /> : <ArrowRightIcon className="w-3 h-3" />}
        <span className="text-sm">{title}</span>
      </div>

      {expanded && <div>{children}</div>}
    </div>
  );
};
