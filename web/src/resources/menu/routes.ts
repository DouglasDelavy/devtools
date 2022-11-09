import { EntityScreen } from './screens/entity';
import { AnimationScreen } from './screens/animation';
import { ConsoleScreen } from './screens/console';

import { ReactComponent as EntityScreenIcon } from '../../assets/icons/entity.svg';
import { ReactComponent as AnimationScreenIcon } from '../../assets/icons/animation.svg';
import { ReactComponent as TerminalScreenIcon } from '../../assets/icons/terminal.svg';

export const routes = [
  {
    path: 'entity',
    label: 'Entity',
    icon: EntityScreenIcon,
    component: EntityScreen,
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
