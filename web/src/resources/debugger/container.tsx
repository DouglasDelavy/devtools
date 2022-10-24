import { useState, useEffect } from 'react';
import { Events } from '../../lib/events';

export default function Debugger() {
  const [data, setData] = useState<Record<string, any>>({});

  const onReceiveData = (data: Record<string, any>): void => {
    setData(data);
  };

  useEffect(() => {
    Events.on('debugger:data', onReceiveData);

    return () => {
      Events.off('debugger:data', onReceiveData);
    };
  }, []);

  return (
    <div className="p-2 flex gap-[2px]">
      {Object.entries(data)?.map(([key, value]) => (
        <ul key={key} className="text-[10px] px-2 text-center bg-black text-white bg-opacity-60">
          <li className="font-bold border-solid">{key}</li>
          <li>{value}</li>
        </ul>
      ))}
    </div>
  );
}
