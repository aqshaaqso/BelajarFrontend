const BASE_URL = process.env.REACT_APP_PLACEHOLDER_ENDPOINT;
const CACHE_TTL_MS = 5 * 60 * 1000;

const cache = new Map();
const inflight = new Map();

const getCacheKey = (path) => path;

const readCache = (key) => {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
    cache.delete(key);
    return null;
  }
  return entry.data;
};

const writeCache = (key, data) => {
  cache.set(key, { data, timestamp: Date.now() });
};

export const clearApiCache = () => {
  cache.clear();
};

export const fetchResource = async (path, { signal } = {}) => {
  const key = getCacheKey(path);
  const cached = readCache(key);
  if (cached) return cached;

  if (inflight.has(key)) {
    return inflight.get(key);
  }

  const request = fetch(`${BASE_URL}${path}`, { signal })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`Request failed (${response.status})`);
      }
      const data = await response.json();
      writeCache(key, data);
      return data;
    })
    .finally(() => {
      inflight.delete(key);
    });

  inflight.set(key, request);
  return request;
};

export const API = {
  users: () => fetchResource("/users"),
  posts: () => fetchResource("/posts"),
  todos: () => fetchResource("/todos"),
};