import { AiOutlineClose, AiOutlineMinus } from 'react-icons/ai';
import { BiFullscreen } from 'react-icons/bi';

import { useMenuContext } from '../../context';

export const Header = () => {
  const { toggleMinimize, handleClose } = useMenuContext();

  return (
    <header className="h-6 w-full px-1 bg-neutral-700 flex justify-end items-center gap-1">
      <button
        type="button"
        onClick={toggleMinimize}
        className="rounded-md text-gray-200 hover:text-white border-none focus:ring-0 focus:ring-white"
      >
        <AiOutlineMinus className="h-5 w-5" aria-hidden="true" />
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
