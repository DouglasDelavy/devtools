import { useMenuContext } from '../../context';
import { routes } from '../../routes';

import { Header } from '../header';
import { SideBar } from '../sidebar';

export const Menu = () => {
  const { minimized, path } = useMenuContext();

  const Component = routes.find(route => route.path === path)?.component;

  return (
    <div className={`h-full ${minimized ? 'w-1/4' : 'w-full'} flex flex-col duration-300 bg-neutral-900 text-white `}>
      <Header />

      <section className="flex flex-auto">
        <SideBar minimized={minimized} />

        <main className="w-full h-full">{Component && <Component />}</main>
      </section>
    </div>
  );
};
