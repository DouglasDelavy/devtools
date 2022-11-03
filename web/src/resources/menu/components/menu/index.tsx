import { useMenuContext } from '../../context';
import { routes } from '../../routes';

import { Header } from '../header';
import { SideBar } from '../sidebar';

export const Menu = () => {
  const { maximize, minimize, path } = useMenuContext();

  const Component = routes.find(route => route.path === path)?.component;

  return (
    <div
      className={`h-full ${maximize ? 'w-1/4' : 'w-full'} flex flex-col duration-300 bg-neutral-900 text-white ${
        minimize ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <Header />

      <section className="flex flex-auto">
        <SideBar maximized={maximize} />

        <main className="w-full h-full">{Component && <Component />}</main>
      </section>
    </div>
  );
};
