import { EntityScreen } from './screens/entity';
import { AnimationScreen } from './screens/animation';

import { ReactComponent as EntityScreenIcon } from '../../assets/icons/entity.svg';
import { ReactComponent as AnimationScreenIcon } from '../../assets/icons/animation.svg';

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
];
