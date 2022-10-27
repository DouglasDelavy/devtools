import { useMenuContext } from '../../context';

import { Header } from '../header';

export const Menu = () => {
  const { minimized } = useMenuContext();

  return (
    <div className={`bg-neutral-900 ${minimized ? 'w-1/4' : 'w-full'} h-full text-white flex flex-col`}>
      <Header />

      <section className="flex flex-auto">
        <aside className="w-1/6 bg-neutral-800"></aside>

        <main className="flex-1 p-2w">
          <h1>Player</h1>
        </main>
      </section>
    </div>
  );
};
