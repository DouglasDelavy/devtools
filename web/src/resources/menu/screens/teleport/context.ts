import { createContext, useContext } from 'react';

type TeleportContextData = {
  items: Teleport.Item[];

  addItem: (item: Teleport.Item) => void;
  removeItem: (id: string) => void;
  toggleSpawnPoint: (id: string) => void;
  teleportToCoords: (coords: number[]) => void;

  openAddItemModal: () => void;
  closeAddItemModal: () => void;
};

export const TeleportContext = createContext({} as TeleportContextData);

export const useTeleportContext = (): TeleportContextData => {
  return useContext(TeleportContext);
};
