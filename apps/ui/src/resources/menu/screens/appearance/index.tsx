import { fetchNui } from '@lib/nui';
import { Accordion } from '@lib/components/accordion';
import { Button } from '@lib/components/button';

import { Restricted } from '../../components/restricted';
import { PERMISSIONS } from '../../permissions';

import { Outfits } from './components/outfits';
import { Tattoos } from './components/tattoos';
import { PlayerModel } from './components/model';
import { Components } from './components/components';
import { Cameras } from './components/cameras';
import { Props } from './components/props';

export const AppearanceScreen = () => {
  const handleSaveAppearance = (): void => {
    fetchNui('appearance:save').catch(console.error);
  };

  const handleDeleteSavedAppearance = (): void => {
    fetchNui('appearance:deleteSave').catch(console.error);
  };

  return (
    <div className="w-full h-full flex flex-col gap-2 overflow-hidden">
      <Cameras />

      <div className="flex gap-2">
        <Button onClick={handleSaveAppearance}>Save</Button>
        <Button onClick={handleDeleteSavedAppearance}>Delete</Button>
      </div>

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
