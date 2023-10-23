import { AiFillCaretLeft, AiOutlineCaretRight } from 'react-icons/ai';
import { BiCamera, BiSolidTShirt, BiBody } from 'react-icons/bi';
import { FaHatCowboy } from 'react-icons/fa';
import { GiArmoredPants, GiConverseShoe } from 'react-icons/gi';

import { Button } from '@lib/components/button';
import { ToolTip } from '@lib/components/tooltip';
import { fetchNui } from '@lib/nui';
import { useEffect } from 'react';

export const Cameras = () => {
  const handleToggleCamera = (): void => {
    fetchNui('appearance:toggleCamera').catch(console.error);
  };

  const handleSetCameraType = (type: string): void => {
    fetchNui('appearance:setCameraType', type).catch(console.error);
  };

  const handleTurnPed = (type: string): void => {
    fetchNui('appearance:turnPed', type).catch(console.error);
  };

  const destroyCamera = (): void => {
    fetchNui('appearance:destroyCamera').catch(console.error);
  };

  useEffect(() => {
    return () => {
      destroyCamera();
    };
  }, []);

  return (
    <div className="flex flex-wrap gap-2">
      <ToolTip tooltip="Camera">
        <Button
          className="px-2 py-1 2xl:px-2 2xl:py-1 bg-neutral-800 hover:bg-neutral-700"
          onClick={handleToggleCamera}
        >
          <BiCamera size={14} />
        </Button>
      </ToolTip>

      <div className="flex gap-1">
        <ToolTip tooltip="Body">
          <Button
            onClick={() => handleSetCameraType('default')}
            className="px-2 py-1 2xl:px-2 2xl:py-1 bg-neutral-800 hover:bg-neutral-700"
          >
            <BiBody size={14} />
          </Button>
        </ToolTip>

        <ToolTip tooltip="Head">
          <Button
            onClick={() => handleSetCameraType('head')}
            className="px-2 py-1 2xl:px-2 2xl:py-1 bg-neutral-800 hover:bg-neutral-700"
          >
            <FaHatCowboy size={14} />
          </Button>
        </ToolTip>

        <ToolTip tooltip="Shirt">
          <Button
            onClick={() => handleSetCameraType('body')}
            className="px-2 py-1 2xl:px-2 2xl:py-1 bg-neutral-800 hover:bg-neutral-700"
          >
            <BiSolidTShirt size={14} />
          </Button>
        </ToolTip>

        <ToolTip tooltip="Pants">
          <Button
            onClick={() => handleSetCameraType('pants')}
            className="px-2 py-1 2xl:px-2 2xl:py-1 bg-neutral-800 hover:bg-neutral-700"
          >
            <GiArmoredPants size={14} />
          </Button>
        </ToolTip>

        <ToolTip tooltip="Shoes">
          <Button
            onClick={() => handleSetCameraType('bottom')}
            className="px-2 py-1 2xl:px-2 2xl:py-1 bg-neutral-800 hover:bg-neutral-700"
          >
            <GiConverseShoe size={14} />
          </Button>
        </ToolTip>
      </div>

      <div className="flex gap-1">
        <ToolTip tooltip="Left">
          <Button
            onClick={() => handleTurnPed('left')}
            className="px-2 py-1 2xl:px-2 2xl:py-1 bg-neutral-800 hover:bg-neutral-700"
          >
            <AiFillCaretLeft size={14} />
          </Button>
        </ToolTip>

        <ToolTip tooltip="Right">
          <Button
            onClick={() => handleTurnPed('right')}
            className="px-2 py-1 2xl:px-2 2xl:py-1 bg-neutral-800 hover:bg-neutral-700"
          >
            <AiOutlineCaretRight size={14} />
          </Button>
        </ToolTip>
      </div>
    </div>
  );
};
