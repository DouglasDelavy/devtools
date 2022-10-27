import { MenuContextProvider } from './context';

import { Menu } from './components/menu';

export default function Container() {
  return (
    <section className="absolute top-0 left-0 p-10 w-screen h-screen flex justify-end">
      <MenuContextProvider>
        <Menu />
      </MenuContextProvider>
    </section>
  );
}
