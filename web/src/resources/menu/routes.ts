import { EntityScreen } from './screens/entity';
import { AnimationScreen } from './screens/animation';
import { ConsoleScreen } from './screens/console';
import { WorldScreen } from './screens/world';

import { ReactComponent as EntityScreenIcon } from '../../assets/icons/entity.svg';
import { ReactComponent as AnimationScreenIcon } from '../../assets/icons/animation.svg';
import { ReactComponent as TerminalScreenIcon } from '../../assets/icons/terminal.svg';
import { ReactComponent as WorldScreenIcon } from '../../assets/icons/world.svg';

export const routes = [
  {
    path: 'entity',
    label: 'Entity',
    icon: EntityScreenIcon,
    component: EntityScreen,
  },
  {
    path: 'world',
    label: 'World',
    icon: WorldScreenIcon,
    component: WorldScreen,
  },
  {
    path: 'animation',
    label: 'Animation',
    icon: AnimationScreenIcon,
    component: AnimationScreen,
  },
  {
    path: 'console',
    label: 'Console',
    icon: TerminalScreenIcon,
    component: ConsoleScreen,
  },
];
