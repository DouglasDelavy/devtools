import { useMenuContext } from 'resources/menu/context';

type RestrictedProps = {
  to: string | string[];
  children: React.ReactNode;
};

export const Restricted = ({ to, children }: RestrictedProps) => {
  const { isAllowed } = useMenuContext();

  return isAllowed(to) ? <>{children}</> : null;
};
