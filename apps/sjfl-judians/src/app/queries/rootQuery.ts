export const getRootData = async (): Promise<{ id: number }> => {
  await new Promise((resolve) =>
    setTimeout(() => {
      resolve(null);
    }, 2000)
  );
  return await fetch('https://jsonplaceholder.typicode.com/todos/2').then(
    (response) => response.json()
  );
};

export const rootDataQuery = {
  queryKey: ['root'],
  queryFn: async () => getRootData(),
};
