import { createContext, ReactNode, useContext, useState } from 'react';

type MenuContextData = {
  minimized: boolean;
  toggleMinimized: () => void;

  path: string | undefined;
  setPath: (path: string) => void;
};

type MenuContextProviderProps = {
  children: ReactNode;
};

export const MenuContext = createContext({} as MenuContextData);

export const useMenuContext = (): MenuContextData => {
  return useContext(MenuContext);
};

export const MenuContextProvider = ({ children }: MenuContextProviderProps) => {
  const [minimized, setMinimized] = useState(true);
  const [path, setPath] = useState<string>();

  const toggleMinimized = (): void => {
    setMinimized(state => !state);
  };

  return <MenuContext.Provider value={{ minimized, toggleMinimized, path, setPath }}>{children}</MenuContext.Provider>;
};
