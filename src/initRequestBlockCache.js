import { RequestBlockCache } from 'react-request-block';

let cache = null;

function create({
  cache,
}) {
  if (cache && cache instanceof RequestBlockCache) {
    return cache;
  }

  return new RequestBlockCache(cache, !!(process.browser) === false);
}

export default function initRequestBlockCache(initialState = {}) {
  if (!process.browser) {
    return create(initialState);
  }

  if (!cache) {
    cache = create(initialState);
  }

  return cache;
}
