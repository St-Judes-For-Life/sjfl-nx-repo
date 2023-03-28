export const getRootData = async (): Promise<{ id: number }> => {
  // return await new Promise((resolve) =>
  //   setTimeout(() => {
  //     resolve({ id: 1 });
  //   }, 2000)
  // );
  return await fetch('https://jsonplaceholder.typicode.com/todos/2').then(
    (response) => response.json()
  );
};

export const rootDataQuery = {
  queryKey: ['root'],
  queryFn: async () => getRootData(),
};
