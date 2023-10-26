import type { SearchItem } from './index';

import { ReactComponent as ArrowRightIcon } from '../../../assets/icons/arrow_right_slim.svg';

export type SuggestionsProps = {
  suggestions: SearchItem[];
  onClick: (suggestion: string) => void;
};

export const Suggestions = ({ suggestions, onClick }: SuggestionsProps) => {
  if (suggestions?.length <= 0) return null;

  return (
    <ul className="bg-neutral-700">
      {suggestions.map(({ label }) => (
        <li
          key={label}
          onClick={() => onClick(label)}
          className="p-1 flex gap-2 items-center text-sm cursor-pointer hover:bg-neutral-600"
        >
          <ArrowRightIcon className="w-4 h-4" />
          {label}
        </li>
      ))}
    </ul>
  );
};
