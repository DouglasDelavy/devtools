declare namespace Teleport {
  type Item = {
    id: string;
    name: string;
    coords: number[];
    isSpawnPoint?: boolean;
  };

  type CreateItem = {
    name: string;
    coords: number[];
  };
}
