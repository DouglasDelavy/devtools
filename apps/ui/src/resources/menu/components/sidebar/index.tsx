import { useMenuContext } from '../../context';
import { routes } from '../../routes';
import { Restricted } from '../restricted';

export const SideBar = () => {
  const { path: currentPath, setPath } = useMenuContext();

  const handleChangePath = (path: string): void => {
    setPath(path);
  };

  return (
    <aside className="w-14 h-full flex flex-col bg-neutral-800 p-2">
      {routes.map(({ path, permissions, icon: Icon }) => (
        <Restricted key={path} to={permissions}>
          <div
            onClick={() => handleChangePath(path)}
            className={`w-full px-2 py-2 flex items-center justify-center gap-2 cursor-pointer ${
              path === currentPath ? 'bg-neutral-700 text-white' : 'text-neutral-300 bg-neutral-800'
            } hover:bg-neutral-700 hover:text-white`}
          >
            <Icon className="w-5 h-5" />
          </div>
        </Restricted>
      ))}
    </aside>
  );
};
