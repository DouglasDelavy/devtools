import { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

import { useMenuContext } from '../../context';
import { routes } from '../../routes';

import { Header } from '../header';
import { SideBar } from '../sidebar';

const CLOSE_KEYS = ['Escape'];

export const Menu = () => {
  const { handleClose, maximize, minimize, path } = useMenuContext();

  const Component = routes.find(route => route.path === path)?.component;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent): void => {
      if (!CLOSE_KEYS.includes(event.key)) return;

      handleClose();
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <div
      className={twMerge(
        'h-full flex-col flex duration-300 bg-neutral-900 text-white',
        maximize ? 'w-1/4' : 'w-full',
        minimize ? 'w-1/4 opacity-50' : 'opacity-100',
      )}
    >
      <Header />

      <section className="flex flex-row flex-grow overflow-hidden">
        <SideBar maximized={maximize} />

        <main className="w-[calc(100%-16.666667%)] h-full flex flex-col p-2">{Component && <Component />}</main>
      </section>
    </div>
  );
};
