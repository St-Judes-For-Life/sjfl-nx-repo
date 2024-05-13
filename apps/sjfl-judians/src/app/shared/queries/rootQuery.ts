export const getRootData = async () => {
  return;
};

export const rootDataQuery = {
  queryKey: ['root'],
  queryFn: async () => getRootData(),
};
