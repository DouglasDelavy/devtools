import { forwardRef, useState } from 'react';
import Fuse from 'fuse.js';

import { ReactComponent as SearchIcon } from '../../../assets/icons/search.svg';
import { Suggestions } from './suggestions';

const MAX_RESULTS = 10;
const DEFAULT_FUSE_OPTIONS = {
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  minMatchCharLength: 1,
  keys: ['label'],
};

export type SearchItem = {
  label: string;
};

export type SearchAutocompleteProps = {
  items: SearchItem[];
  maxResults?: number;
  fuseOptions?: Fuse.IFuseOptions<unknown>;
} & React.ComponentPropsWithoutRef<'input'>;

export const SearchAutocomplete = forwardRef<HTMLInputElement, SearchAutocompleteProps>(
  ({ items, maxResults = MAX_RESULTS, fuseOptions = DEFAULT_FUSE_OPTIONS, ...rest }, ref) => {
    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState<SearchItem[]>([]);

    const fuse = new Fuse(items, fuseOptions);

    const fuseResults = (keyword: string) =>
      fuse
        .search(keyword)
        .map(result => ({ ...result.item }))
        .slice(0, maxResults);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      const keyword = event.target.value;

      setSuggestions(keyword.length > 0 ? fuseResults(keyword) : []);
      setValue(keyword);
    };

    const handleSelectSuggestion = (suggestion: string): void => {
      setValue(suggestion);
      setSuggestions([]);
    };

    return (
      <div className="w-full inline-flex flex-col justify-center relative gap-1">
        <div className="relative w-full">
          <div className="flex absolute inset-y-0 left-0 items-center pl-2 pointer-events-none">
            <SearchIcon className="w-4 h-4 text-neutral-400" />
          </div>

          <input
            {...rest}
            ref={ref}
            value={value}
            type="text"
            onChange={handleChange}
            className="w-full p-1 pl-7 text-sm bg-neutral-700 text-neutral-300 placeholder:text-neutral-400"
          />
        </div>

        <Suggestions suggestions={suggestions} onClick={handleSelectSuggestion} />
      </div>
    );
  },
);
