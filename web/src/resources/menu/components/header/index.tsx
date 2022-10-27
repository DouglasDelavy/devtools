import { AiOutlineClose } from 'react-icons/ai';
import { BiFullscreen } from 'react-icons/bi';

import { fetchNui } from '@lib/nui';
import { useMenuContext } from '../../context';

export const Header = () => {
  const { toggleMinimized } = useMenuContext();

  const handleClose = (): void => {
    fetchNui('menu:close').catch(console.error);
  };

  const handleToggleMinimized = (): void => {
    toggleMinimized();
  };

  return (
    <header className="h-6 w-full px-1 bg-neutral-700 flex justify-end items-center">
      <button
        type="button"
        onClick={handleToggleMinimized}
        className="rounded-md text-gray-200 hover:text-white border-none focus:ring-0 focus:ring-white"
      >
        <BiFullscreen className="h-4 w-4" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={handleClose}
        className="rounded-md text-gray-200 hover:text-white border-none focus:ring-0 focus:ring-white"
      >
        <AiOutlineClose className="h-5 w-5" aria-hidden="true" />
      </button>
    </header>
  );
};
