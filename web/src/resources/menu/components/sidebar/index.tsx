import { useMenuContext } from '../../context';
import { routes } from '../../routes';

type SideBarProps = {
  maximized: boolean;
};

export const SideBar = ({ maximized }: SideBarProps) => {
  const { setPath } = useMenuContext();

  const handleChangePath = (path: string): void => {
    setPath(path);
  };

  return (
    <aside className="w-1/6 bg-neutral-800 p-2">
      {routes.map(({ path, label, icon: Icon }) => (
        <div
          key={path}
          onClick={() => handleChangePath(path)}
          className={`w-full px-2 py-2 flex items-center ${
            maximized && 'justify-center'
          } gap-2 cursor-pointer text-neutral-300 bg-neutral-800 hover:bg-neutral-700 hover:text-white`}
        >
          <Icon className="w-5 h-5" />
          {!maximized && <p>{label}</p>}
        </div>
      ))}
    </aside>
  );
};
