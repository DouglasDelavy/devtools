export const fetchNui = async <T = unknown>(eventName: string, data = {}): Promise<T | undefined> => {
  const url = `https://${GetParentResourceName()}/${eventName}`;

  const response = await fetch(url, {
    method: 'post',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  });

  return response.ok ? response.json() : undefined;
};

export const fetchFile = async <T = unknown>(fileURL: string): Promise<T | undefined> => {
  const url = `https://cfx-nui-${GetParentResourceName()}/${fileURL}`;

  const response = await fetch(url);

  return response.ok ? response.json() : undefined;
};
