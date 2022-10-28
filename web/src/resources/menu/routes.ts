import { EntityScreen } from './screens/entity';
import { ReactComponent as EntityScreenIcon } from '../../assets/icons/entity.svg';

export const routes = [
  {
    path: 'entity',
    label: 'Entity',
    icon: EntityScreenIcon,
    component: EntityScreen,
  },
];
