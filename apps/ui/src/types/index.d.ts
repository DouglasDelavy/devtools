declare function GetParentResourceName(): string;

interface Window {
  emitEvent: (type: string, payload: unknown) => void;
}

type BaseResource = {
  name: string;
  component: () => JSX.Element;
};
