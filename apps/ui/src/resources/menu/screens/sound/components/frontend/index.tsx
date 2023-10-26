import { useEffect, useMemo, useRef, useState } from 'react';

import { fetchFile, fetchNui } from '@lib/nui';

import { SearchAutocomplete } from '@lib/components/search-autocomplete';
import { Button } from '@lib/components/button';
import { CheckBox } from '@lib/components/checkbox';
import { Input } from '@lib/components/input';

export type Sound = {
  audioName: string;
  audioRef: string;
};

export const SoundFrontend = () => {
  const [sounds, setSounds] = useState<Sound[]>([
    {
      audioName: '1st_Person_Transition',
      audioRef: 'PLAYER_SWITCH_CUSTOM_SOUNDSET',
    },
  ]);

  const inputAudioNameRef = useRef<HTMLInputElement>(null);
  const inputAudioRef = useRef<HTMLInputElement>(null);
  const unkRef = useRef<HTMLInputElement>(null);

  const selectOptions = useMemo(() => sounds.map(sound => ({ label: sound.audioName })), [sounds]);

  useEffect(() => {
    fetchFile<Sound[]>('data/sounds.json')
      .then(sounds => sounds && setSounds(sounds))
      .catch(console.error);
  }, []);

  const handleSelectSuggestion = (audioName: string): void => {
    if (!inputAudioRef.current || !inputAudioNameRef.current) return;

    const sound = sounds.find(sound => sound.audioName === audioName);
    if (sound) {
      inputAudioNameRef.current.value = sound.audioName;
      inputAudioRef.current.value = sound.audioRef;
    }
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    const audioName = inputAudioNameRef.current?.value;
    if (!audioName) return;

    const audioRef = inputAudioRef.current?.value;
    if (!audioRef) return;

    fetchNui('sound:frontend:play', {
      audioName,
      audioRef,
      p3: unkRef.current?.checked,
    }).catch(console.error);
  };

  const handleStop = (): void => {
    fetchNui('sound:stop').catch(console.error);
  };

  return (
    <form className="h-full flex py-2 flex-col gap-1" onSubmit={handleSubmit}>
      <SearchAutocomplete onSelectSuggestion={handleSelectSuggestion} items={selectOptions} />

      <Input ref={inputAudioNameRef} label="Audio Name" placeholder="Audio Name" />
      <Input ref={inputAudioRef} label="Audio Ref" placeholder="Audio Ref" />

      <div className="py-2 flex flex-wrap gap-2">
        <CheckBox ref={unkRef} label="Unk" />
      </div>

      <div className="mt-1 flex justify-end items-center gap-1">
        <Button type="submit">Play</Button>

        <Button type="button" onClick={handleStop}>
          Stop
        </Button>
      </div>
    </form>
  );
};
