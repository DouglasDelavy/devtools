import { fetchNui } from '@lib/nui';
import { createContext, ReactNode, useContext, useState } from 'react';

type MenuContextData = {
  maximize: boolean;
  toggleMinimize: () => void;

  minimize: boolean;
  toggleMaximize: () => void;

  path: string | undefined;
  setPath: (path: string) => void;
};

type MenuContextProviderProps = {
  children: ReactNode;
};

const MenuContext = createContext({} as MenuContextData);

export const useMenuContext = (): MenuContextData => {
  return useContext(MenuContext);
};

export const MenuContextProvider = ({ children }: MenuContextProviderProps) => {
  const [maximize, setMaximize] = useState(true);
  const [minimize, setMinimize] = useState(false);

  const [path, setPath] = useState<string>();

  const toggleMinimize = (): void => {
    const state = !minimize;

    setMinimize(state);
    fetchNui('menu:minimize', state).catch(console.error);
  };

  const toggleMaximize = (): void => {
    setMaximize(state => !state);
  };

  return (
    <MenuContext.Provider value={{ maximize, toggleMaximize, minimize, toggleMinimize, path, setPath }}>
      {children}
    </MenuContext.Provider>
  );
};
