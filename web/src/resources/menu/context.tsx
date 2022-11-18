import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';

import { isDevelopment } from '@lib/env';
import { addFetchMock, fetchNui } from '@lib/nui';
import { useLocalStorage } from '@lib/hooks/local-storage';
import { PERMISSIONS } from './permissions';

const MENU_MAXIMIZE_STORAGE_KEY = 'menu:maximize';

type MenuContextData = {
  maximize: boolean;
  toggleMinimize: () => void;

  minimize: boolean;
  toggleMaximize: () => void;

  handleClose: () => void;
  isAllowed: (permission: string[] | string) => boolean;

  path: string | undefined;
  setPath: (path: string) => void;
};

type MenuContextProviderProps = {
  children: ReactNode;
};

if (isDevelopment()) {
  addFetchMock('menu:getPermissions', () => Object.values(PERMISSIONS).filter(x => x !== PERMISSIONS.ENTITY_DELETE));
}

const MenuContext = createContext({} as MenuContextData);

export const useMenuContext = (): MenuContextData => {
  return useContext(MenuContext);
};

export const MenuContextProvider = ({ children }: MenuContextProviderProps) => {
  const [maximize, setMaximize] = useLocalStorage(MENU_MAXIMIZE_STORAGE_KEY, true);
  const [minimize, setMinimize] = useState(false);

  const [path, setPath] = useState<string>();
  const [permissions, setPermissions] = useState<string[]>([]);

  const toggleMinimize = (): void => {
    const state = !minimize;

    setMinimize(state);
    fetchNui('menu:minimize', state).catch(console.error);
  };

  const toggleMaximize = (): void => {
    setMaximize(state => !state);
  };

  const handleClose = (): void => {
    fetchNui('menu:close').catch(console.error);
  };

  const isAllowed = useCallback(
    (permission: string[] | string): boolean => {
      if (Array.isArray(permission)) {
        return permissions.some(perm => permission.includes(perm));
      }

      return permissions.includes(permission);
    },
    [permissions],
  );

  useEffect(() => {
    fetchNui<string[]>('menu:getPermissions')
      .then(result => {
        if (!result) return;

        setPermissions(result);
      })
      .catch(console.error);
  }, []);

  return (
    <MenuContext.Provider
      value={{
        maximize,
        toggleMaximize,
        minimize,
        toggleMinimize,
        handleClose,
        isAllowed,
        path,
        setPath,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
