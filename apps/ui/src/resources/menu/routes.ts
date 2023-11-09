import { EntityScreen } from './screens/entity';
import { AnimationScreen } from './screens/animation';
import { ConsoleScreen } from './screens/console';
import { WorldScreen } from './screens/world';
import { VehicleScreen } from './screens/vehicle';
import { TeleportScreen } from './screens/teleport';
import { SoundScreen } from './screens/sound';
import { AppearanceScreen } from './screens/appearance';

import { PERMISSIONS } from './permissions';

import { ReactComponent as EntityScreenIcon } from '../../assets/icons/entity.svg';
import { ReactComponent as AnimationScreenIcon } from '../../assets/icons/animation.svg';
import { ReactComponent as TerminalScreenIcon } from '../../assets/icons/terminal.svg';
import { ReactComponent as SoundScreenIcon } from '../../assets/icons/sound.svg';
import { ReactComponent as WorldScreenIcon } from '../../assets/icons/world.svg';
import { ReactComponent as VehicleScreenIcon } from '../../assets/icons/vehicle.svg';
import { ReactComponent as TeleportScreenIcon } from '../../assets/icons/teleport.svg';
import { ReactComponent as AppearanceScreenIcon } from '../../assets/icons/outfit.svg';
import { TimecycleScreen } from './screens/timecycle';

export const routes = [
  {
    path: 'entity',
    label: 'Entity',
    icon: EntityScreenIcon,
    component: EntityScreen,
    permissions: [PERMISSIONS.ENTITY_MENU],
  },
  {
    path: 'vehicle',
    label: 'Vehicle',
    icon: VehicleScreenIcon,
    component: VehicleScreen,
    permissions: [PERMISSIONS.VEHICLE_MENU],
  },
  {
    path: 'sound',
    label: 'Sound',
    icon: SoundScreenIcon,
    component: SoundScreen,
    permissions: [PERMISSIONS.SOUND_MENU],
  },
  {
    path: 'world',
    label: 'World',
    icon: WorldScreenIcon,
    component: WorldScreen,
    permissions: [PERMISSIONS.WORLD_MENU],
  },
  {
    path: 'teleport',
    label: 'Teleport',
    icon: TeleportScreenIcon,
    component: TeleportScreen,
    permissions: [PERMISSIONS.TELEPORT_MENU],
  },
  {
    path: 'animation',
    label: 'Animation',
    icon: AnimationScreenIcon,
    component: AnimationScreen,
    permissions: [PERMISSIONS.ANIMATION_MENU],
  },
  {
    path: 'console',
    label: 'Console',
    icon: TerminalScreenIcon,
    component: ConsoleScreen,
    permissions: [PERMISSIONS.CONSOLE_MENU],
  },
  {
    path: 'appearance',
    label: 'Appearance',
    icon: AppearanceScreenIcon,
    component: AppearanceScreen,
    permissions: [PERMISSIONS.APPEARANCE],
  },
  {
    path: 'timecycle',
    label: 'Timecycle',
    icon: WorldScreenIcon,
    component: TimecycleScreen,
    permissions: [PERMISSIONS.TIMECYCLE],
  },
];
