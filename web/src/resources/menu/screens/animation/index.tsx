import { useEffect, useMemo, useState } from 'react';

import { isDevelopment } from '@lib/env';
import { addFetchMock, fetchFile, fetchNui } from '@lib/nui';

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

const ANIMATIONS_FLAGS = [
  {
    name: 'None',
    value: 0,
    disabled: true,
  },
  {
    name: 'Loop',
    value: 1,
  },
  {
    name: 'StayInEndFrame',
    value: 2,
  },
  {
    name: 'UpperBodyOnly',
    value: 16,
  },
  {
    name: 'Secondary',
    value: 32,
  },
  {
    name: 'RagdollOnCollision',
    value: 4194304,
  },
];

if (isDevelopment()) {
  addFetchMock('menu:playerPedId', () => 1);
  addFetchMock('data/animations.json', () => []);
}

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

  const dictionaries = useMemo(() => {
    if (!animations) return [];

    return animations
      .filter(animation => animation.dictionaryName.includes(search))
      .map(animation => ({ value: animation.dictionaryName, label: animation.dictionaryName }));
  }, [animations, search]);

  const names = useMemo(() => {
    if (!animations || !dictionary) return [];

    const animation = animations.find(animation => animation.dictionaryName === dictionary);
    if (!animation) return [];

    return animation.animations.map(name => ({ value: name, label: name }));
  }, [animations, dictionary]);

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
    <section className="w-full h-full flex flex-col justify-between gap-2 overflow-auto">
      <div className="flex flex-col gap-2">
        <SearchInput placeholder="Search" value={search} onChange={handleChangeSearch} />

        <Select label="Dictionary" name="dictionary" options={dictionaries} onChange={handleChangeDictionary} />
        <Select label="Name" name="name" options={names} onChange={handleChangeName} />

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

        <div className="flex gap-2 items-center">
          <Button onClick={handlePlayAnimation}>Play</Button>
          <Button onClick={handleStopAnimation}>Stop</Button>
        </div>

        <div className="flex gap-2 flex-wrap ">
          {ANIMATIONS_FLAGS.map(animFlag => (
            <CheckBox
              label={animFlag.name}
              value={animFlag.value}
              disabled={animFlag.disabled}
              checked={(flags & animFlag.value) !== 0}
              onChange={handleChangeFlags}
            />
          ))}
        </div>
      </div>

      <div className="flex">
        <TextArea
          rows={7}
          defaultValue={JSON.stringify({ name, dictionary, blendInSpeed, blendOutSpeed, flags }, null, 4)}
        />
      </div>
    </section>
  );
};
