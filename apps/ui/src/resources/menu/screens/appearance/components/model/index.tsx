import { useEffect, useMemo, useRef, useState } from 'react';

import { SearchAutocomplete } from '@lib/components/search-autocomplete';
import { fetchFile, fetchNui } from '@lib/nui';
import { Button } from '@lib/components/button';

export const PlayerModel = () => {
  const [models, setModels] = useState<string[]>([]);

  const inputModelRef = useRef<HTMLInputElement>(null);

  const modelOptions = useMemo(() => models.map(model => ({ label: model })), [models]);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    const model = inputModelRef.current?.value;
    if (model) {
      fetchNui('appearance:model', model).catch(console.error);
    }
  };

  const fetchAvailableModels = (): void => {
    fetchFile<string[]>('data/peds.json')
      .then(result => {
        if (!result) return;

        setModels(result);
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchAvailableModels();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 py-1">
      <SearchAutocomplete ref={inputModelRef} items={modelOptions} />

      <div className="mt-1 flex justify-end items-center">
        <Button type="submit">Apply</Button>
      </div>
    </form>
  );
};
