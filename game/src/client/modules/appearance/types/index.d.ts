declare namespace Appearance {
  type Component = {
    id: number;
    drawable: number;
    texture: number;
  };

  type Prop = {
    id: number;
    drawable: number;
    texture: number;
  };

  type Decoration = {
    collectionHash: string | number;
    nameHash: string | number;
  };

  type PedAppearance = {
    components: Component[];
    props: Prop[];
    decorations: Decoration[];
  };

  type Outfit = {
    hash: number;
    lockHash: number;
    price: number;
    unk2: number;
    unk3: number;
    textLabel: string;
    components: ShopPedComponent[];
    props: ShopPedProp[];
  };

  type ShopPedOutfit = {
    hash: number;
    lockHash: number;
    price: number;
    totalProps: number;
    totalComponents: number;
    unk2: number;
    unk3: number;
    textLabel: string;
  };

  type ShopPedComponent = {
    lockHash: number;
    uniqueNameHash: number;
    locate: number;
    drawableIndex: number;
    textureIndex: number;
    unk1: number;
    eCompType: number;
    unk2: number;
    unk3: number;
    textLabel: string;
  };

  type ShopPedProp = {
    lockHash: number;
    uniqueNameHash: number;
    locate: number;
    propIndex: number;
    textureIndex: number;
    unk1: number;
    eAnchorPoint: number;
    unk2: number;
    unk3: number;
    textLabel: string;
  };

  type ShopPedComponentVariant = {
    hash: number;
    enumValue: number;
    componentType: number;
  };

  type ShopPedPropVariant = {
    hash: number;
    enumValue: number;
    componentType: number;
  };

  type ShopPedTattoo = {
    unk1: number;
    unk2: number;
    tattooCollectionHash: number;
    tattooNameHash: number;
    unk3: number;
    zoneId: number;
    unk4: number;
    textLabel: string;
  };
}
