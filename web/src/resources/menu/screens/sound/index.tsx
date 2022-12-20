import { Accordion } from '@lib/components/accordion';

import { SoundFrontend } from './components/frontend';

import { Restricted } from '../../components/restricted';
import { PERMISSIONS } from '../../permissions';

export const SoundScreen = () => {
  return (
    <div className="w-full flex flex-col gap-2">
      <Restricted to={PERMISSIONS.PLAY_SOUND_FRONTEND}>
        <Accordion title="Sound Frontend">
          <SoundFrontend />
        </Accordion>
      </Restricted>
    </div>
  );
};
