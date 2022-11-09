import { useMenuContext } from '../../context';
import { routes } from '../../routes';

import { Header } from '../header';
import { SideBar } from '../sidebar';

export const Menu = () => {
  const { maximize, minimize, path } = useMenuContext();

  const Component = routes.find(route => route.path === path)?.component;

  return (
    <div
      className={`h-full ${maximize ? 'w-1/4' : 'w-full'} flex-col flex duration-300 bg-neutral-900 text-white ${
        minimize ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <Header />

      <section className="flex flex-row flex-grow overflow-auto">
        <SideBar maximized={maximize} />

        <main className="w-[calc(100%-16.666667%)] h-full flex flex-col p-2">{Component && <Component />}</main>
      </section>
    </div>
  );
};
