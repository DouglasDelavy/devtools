import { InputHTMLAttributes } from 'react';

import { ReactComponent as SearchIcon } from '../../../assets/icons/search.svg';

type SearchInputProps = InputHTMLAttributes<HTMLInputElement>;

export const SearchInput = ({ ...rest }: SearchInputProps) => {
  return (
    <div className="relative w-full">
      <div className="flex absolute inset-y-0 left-0 items-center pl-2 pointer-events-none">
        <SearchIcon className="w-4 h-4 text-neutral-400" />
      </div>

      <input
        {...rest}
        className="w-full pl-7 p-1 block text-sm bg-neutral-700 text-neutral-300  placeholder:text-neutral-400"
      />
    </div>
  );
};
