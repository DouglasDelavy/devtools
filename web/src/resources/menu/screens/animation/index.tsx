import { useEffect, useState } from 'react';

import { fetchFile, fetchNui } from '@lib/nui';

import { Button } from '@lib/components/button';
import { Select } from '@lib/components/select';
import { SearchInput } from '@lib/components/search-input';
import { Input } from '@lib/components/input';
import { CheckBox } from '@lib/components/checkbox';
import { TextArea } from '@lib/components/text-area';

type Animation = {
  dictionaryName: string;
  animations: string[];
};

export const AnimationScreen = () => {
  const [animations, setAnimations] = useState<Animation[]>();

  const [name, setName] = useState('');
  const [search, setSearch] = useState('');
  const [dictionary, setDictionary] = useState('');

  const [entity, setEntity] = useState(0);
  const [flags, setFlags] = useState(0);
  const [blendInSpeed, setBlendInSpeed] = useState(4.0);
  const [blendOutSpeed, setBlendOutSpeed] = useState(-4.0);

  useEffect(() => {
    fetchFile<Animation[]>('data/animations.json')
      .then(animations => setAnimations(animations))
      .catch(console.error);

    fetchNui<number>('menu:playerPedId')
      .then(playerPed => setEntity(playerPed || 0))
      .catch(console.error);
  }, []);

  const getAnimationDictionaries = () => {
    if (!animations) return [];

    return animations
      .filter(animation => animation.dictionaryName.includes(search))
      .map(animation => ({ value: animation.dictionaryName, label: animation.dictionaryName }));
  };

  const getAnimationNames = () => {
    if (!animations || !dictionary) return [];

    const animation = animations.find(animation => animation.dictionaryName === dictionary);
    if (!animation) return [];

    return animation.animations.map(name => ({ value: name, label: name }));
  };

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
  };

  const handleChangeDictionary = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDictionary(e.target.value);
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setName(e.target.value);
  };

  const handleChangeEntity = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = Number(e.target.value);
    if (isNaN(value)) return;

    setEntity(value);
  };

  const handleChangeBlendInSpeed = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = Number(e.target.value);
    if (isNaN(value)) return;

    setBlendInSpeed(value);
  };

  const handleChangeBlendOutSpeed = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = Number(e.target.value);
    if (isNaN(value)) return;

    setBlendOutSpeed(value);
  };

  const handleChangeFlags = (e: React.ChangeEvent<HTMLInputElement>) => {
    const current = Number(e.target.value);
    const checked = e.target.checked;

    if (checked) {
      setFlags(flags | current);
    } else {
      setFlags(prev => prev - (flags & current));
    }
  };

  const handlePlayAnimation = (): void => {
    fetchNui('animation:play', { entity, dictionary, name, flags, blendInSpeed, blendOutSpeed });
  };

  const handleStopAnimation = (): void => {
    fetchNui('animation:stop', entity);
  };

  return (
    <section className="w-full h-full flex flex-col justify-between gap-2">
      <div className="flex flex-col gap-2">
        <SearchInput placeholder="Search" value={search} onChange={handleChangeSearch} />

        <Select
          label="Dictionary"
          name="dictionary"
          options={getAnimationDictionaries()}
          onChange={handleChangeDictionary}
        />
        <Select label="Name" name="name" options={getAnimationNames()} onChange={handleChangeName} />

        <Input type="number" label="Entity" placeholder="Entity Id" value={entity} onChange={handleChangeEntity} />

        <div className="flex gap-1">
          <Input
            type="number"
            label="Blend In Speed"
            placeholder="Blend In Speed"
            value={blendInSpeed}
            onChange={handleChangeBlendInSpeed}
          />
          <Input
            type="number"
            label="Blend Out Speed"
            placeholder="Blend Out Speed"
            value={blendOutSpeed}
            onChange={handleChangeBlendOutSpeed}
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          <CheckBox label="None" value={0} checked={true} disabled />
          <CheckBox label="Loop" value={1} checked={(flags & 1) !== 0} onChange={handleChangeFlags} />
          <CheckBox label="StayInEndFrame" value={2} checked={(flags & 2) !== 0} onChange={handleChangeFlags} />
          <CheckBox label="UpperBodyOnly" value={16} checked={(flags & 16) !== 0} onChange={handleChangeFlags} />
          <CheckBox label="AllowRotation" value={32} checked={(flags & 32) !== 0} onChange={handleChangeFlags} />
          <CheckBox
            label="CancelableWithMovement"
            value={128}
            checked={(flags & 128) !== 0}
            onChange={handleChangeFlags}
          />
          <CheckBox
            label="RagdollOnCollision"
            value={4194304}
            checked={(flags & 4194304) !== 0}
            onChange={handleChangeFlags}
          />
        </div>

        <div className="flex gap-2 items-center">
          <Button onClick={handlePlayAnimation}>Play</Button>
          <Button onClick={handleStopAnimation}>Stop</Button>
        </div>
      </div>

      <TextArea rows={7} value={JSON.stringify({ name, dictionary, blendInSpeed, blendOutSpeed, flags }, null, 4)} />
    </section>
  );
};
