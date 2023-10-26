import { Button } from '@lib/components/button';

import { ReactComponent as ArrowRightCircleIcon } from '../../../../assets/icons/arrow_right_circle.svg';
import { ReactComponent as TrashIcon } from '../../../../assets/icons/trash.svg';
import { ReactComponent as FavoriteIcon } from '../../../../assets/icons/favorite.svg';

import { useTeleportContext } from './context';

export const TeleportList = () => {
  const { items, openAddItemModal, removeItem, toggleSpawnPoint, teleportToCoords } = useTeleportContext();

  return (
    <section>
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-sm 2xl:text-lg">Items</h1>

        <Button onClick={openAddItemModal}>Add</Button>
      </div>

      <div className="flex pt-2 flex-col gap-2 overflow-auto">
        {items.map(({ id, name, coords, isSpawnPoint }) => (
          <div
            key={id}
            className="w-full p-1 flex items-center justify-between text-sm font-semibold bg-neutral-700 text-neutral-300"
          >
            <div className="flex flex-col">
              <h1 className="text-neutral-100 text-sm 2xl:text-base">{name}</h1>
              <p className="text-[10px]">
                X: {coords[0]} Y: {coords[1]} Z: {coords[2]}
              </p>
            </div>

            <div className="flex items-center gap-1">
              <button onClick={() => removeItem(id)}>
                <TrashIcon className="w-4 h-4  hover:brightness-75 fill-blue-700" />
              </button>

              <button onClick={() => toggleSpawnPoint(id)}>
                <FavoriteIcon
                  className={`w-4 h-4 hover:brightness-75 ${isSpawnPoint ? 'fill-yellow-400' : 'fill-white'}`}
                />
              </button>

              <button onClick={() => teleportToCoords(coords)}>
                <ArrowRightCircleIcon className="w-4 h-4 hover:brightness-75" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
