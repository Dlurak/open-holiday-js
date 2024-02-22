/**
 * If a url ends with a `/` this function will remove it
 */
export const serializeUrl = (url: string) => {
  const endsWithSlash = url.endsWith('/');

  if (endsWithSlash) return url.slice(0, -1);

  return url;
};
