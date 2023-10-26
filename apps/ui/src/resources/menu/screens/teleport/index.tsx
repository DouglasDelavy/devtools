import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { addFetchMock, fetchNui } from '@lib/nui';
import { isDevelopment } from '@lib/env';
import { Button } from '@lib/components/button';

import { TeleportContext } from './context';

import { TeleportCoordsModal } from './modal/teleport-coords-modal';
import { SaveTeleportModal } from './modal/save-teleport-modal';
import { TeleportList } from './list';
import { Restricted } from 'resources/menu/components/restricted';
import { PERMISSIONS } from 'resources/menu/permissions';

if (isDevelopment()) {
  addFetchMock('teleport:add', () => uuidv4());
}

export const TeleportScreen = () => {
  const [items, setItems] = useState<Teleport.Item[]>([]);

  const [isAddTeleportModalOpen, setIsAddTeleportModalOpen] = useState(false);
  const [isTeleportCoordsModalOpen, setIsTeleportCoordsModalOpen] = useState(false);

  useEffect(() => {
    fetchNui<Teleport.Item[]>('teleport:getItems')
      .then(result => {
        if (!result) return;

        setItems(result);
      })
      .catch(console.error);
  }, []);

  const openTeleportModal = (): void => {
    setIsTeleportCoordsModalOpen(true);
  };

  const closeTeleportModal = (): void => {
    setIsTeleportCoordsModalOpen(false);
  };

  const openAddItemModal = (): void => {
    setIsAddTeleportModalOpen(true);
  };

  const closeAddItemModal = (): void => {
    setIsAddTeleportModalOpen(false);
  };

  const addItem = (item: Teleport.CreateItem): void => {
    fetchNui<string>('teleport:add', item)
      .then(id => {
        if (!id) return;

        setItems(state => [...state, { id, ...item }]);
        closeAddItemModal();
      })
      .catch(console.error);
  };

  const removeItem = (id: string): void => {
    fetchNui('teleport:remove', id)
      .then(() => {
        setItems(state => state.filter(item => item.id !== id));
      })
      .catch(console.error);
  };

  const teleportToCoords = (coords: number[]): void => {
    fetchNui('teleport:start', coords).catch(console.error);
  };

  const teleportToWaypoint = (): void => {
    fetchNui('teleport:waypoint').catch(console.error);
  };

  const toggleSpawnPoint = (id: string): void => {
    fetchNui('teleport:toggleSpawnPoint', id)
      .then(() => {
        const newItems = Array.from(items);

        const item = newItems.find(item => item.id === id);
        if (!item) return;

        const currentSpawnPoint = newItems.find(item => item.isSpawnPoint);
        if (currentSpawnPoint && currentSpawnPoint.id !== id) {
          currentSpawnPoint.isSpawnPoint = false;
          item.isSpawnPoint = true;
        } else {
          item.isSpawnPoint = !item.isSpawnPoint;
        }

        setItems(newItems);
      })
      .catch(console.error);
  };

  return (
    <TeleportContext.Provider
      value={{ items, addItem, removeItem, toggleSpawnPoint, teleportToCoords, openAddItemModal, closeAddItemModal }}
    >
      <section className="w-full h-full flex flex-col gap-2">
        <div className="w-full pb-2 flex gap-2 items-center justify-between border-b-2 border-neutral-500">
          <h1 className="font-semibold text-sm 2xl:text-lg">Teleport To</h1>

          <div className="flex gap-2">
            <Restricted to={PERMISSIONS.TELEPORT_TO_COORDS}>
              <Button onClick={openTeleportModal}>Coords</Button>
            </Restricted>

            <Restricted to={PERMISSIONS.TELEPORT_TO_WAYPOINT}>
              <Button onClick={teleportToWaypoint}>Waypoint</Button>
            </Restricted>
          </div>
        </div>

        <Restricted to={PERMISSIONS.TELEPORT_ITEMS}>
          <TeleportList />
        </Restricted>

        <SaveTeleportModal open={isAddTeleportModalOpen} onClose={closeAddItemModal} onSubmit={addItem} />

        <TeleportCoordsModal
          open={isTeleportCoordsModalOpen}
          onClose={closeTeleportModal}
          onSubmit={teleportToCoords}
        />
      </section>
    </TeleportContext.Provider>
  );
};
