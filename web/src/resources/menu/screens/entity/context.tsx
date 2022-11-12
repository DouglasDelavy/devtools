import { createContext, useContext } from 'react';

type EntityContextData = {
  entity: number;
};

export const EntityContext = createContext({} as EntityContextData);

export const useEntityContext = (): EntityContextData => {
  return useContext(EntityContext);
};
