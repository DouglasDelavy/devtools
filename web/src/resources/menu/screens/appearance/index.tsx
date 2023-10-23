import { Accordion } from '@lib/components/accordion';

import { Restricted } from '../../components/restricted';
import { PERMISSIONS } from '../../permissions';

import { Outfits } from './components/outfits';
import { Tattoos } from './components/tattoos';
import { PlayerModel } from './components/model';
import { Components } from './components/components';
import { Cameras } from './components/cameras';
import { Props } from './components/props';

export const AppearanceScreen = () => {
  return (
    <div className="w-full flex flex-col gap-2 overflow-hidden">
      <Cameras />

      <div className="flex flex-col gap-2 overflow-auto">
        <Restricted to={PERMISSIONS.APPEARANCE_MODEL}>
          <Accordion title="Model">
            <PlayerModel />
          </Accordion>
        </Restricted>

        <Restricted to={PERMISSIONS.APPEARANCE_COMPONENTS}>
          <Accordion title="Components">
            <Components />
          </Accordion>
        </Restricted>

        <Restricted to={PERMISSIONS.APPEARANCE_PROPS}>
          <Accordion title="Props">
            <Props />
          </Accordion>
        </Restricted>

        <Restricted to={PERMISSIONS.APPEARANCE_OUTFITS}>
          <Accordion title="Outfits">
            <Outfits />
          </Accordion>
        </Restricted>

        <Restricted to={PERMISSIONS.APPEARANCE_TATTOOS}>
          <Accordion title="Tattoos">
            <Tattoos />
          </Accordion>
        </Restricted>
      </div>
    </div>
  );
};
