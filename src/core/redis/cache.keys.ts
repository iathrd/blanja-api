// shared/cache/cache.keys.ts
export const CacheKeys = {
  users: {
    all: () => 'users:all',
    byId: (id: number | string) => `user:${id}`,
  },
};
