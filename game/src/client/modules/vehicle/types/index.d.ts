declare namespace Vehicle {
  type Create = {
    model: string | number;
    position: number[];
    heading?: number;
    isServerSetter?: boolean;
    isNetworked?: boolean;
    isScriptHost?: boolean;
  };
}
