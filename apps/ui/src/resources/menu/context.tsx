import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';

import { isDevelopment } from '@lib/env';
import { addFetchMock, fetchNui } from '@lib/nui';
import { useLocalStorage } from '@lib/hooks/local-storage';
import { PERMISSIONS } from './permissions';

type MenuContextData = {
  minimize: boolean;
  toggleMinimize: () => void;

  handleClose: () => void;
  isAllowed: (permission: string[] | string) => boolean;

  path: string | undefined;
  setPath: (path: string) => void;
};

type MenuContextProviderProps = {
  children: ReactNode;
};

if (isDevelopment()) {
  addFetchMock('menu:getPermissions', () => Object.values(PERMISSIONS));
}

const MenuContext = createContext({} as MenuContextData);

export const useMenuContext = (): MenuContextData => {
  return useContext(MenuContext);
};

export const MenuContextProvider = ({ children }: MenuContextProviderProps) => {
  const [minimize, setMinimize] = useState(false);

  const [path, setPath] = useState<string>();
  const [permissions, setPermissions] = useState<string[]>([]);

  const toggleMinimize = (): void => {
    const state = !minimize;

    setMinimize(state);
    fetchNui('menu:minimize', state).catch(console.error);
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
