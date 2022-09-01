declare function GetParentResourceName(): string;

type BaseResource = {
  name: string;
  component: () => JSX.Element;
};
