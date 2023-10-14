import { Accordion } from '@lib/components/accordion';

import { Restricted } from '../../components/restricted';
import { PERMISSIONS } from '../../permissions';

import { Outfits } from './components/outfits';
import { Tattoos } from './components/tattoos';

export const AppearanceScreen = () => {
  return (
    <div className="w-full flex flex-col gap-2">
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
  );
};
