/**
 * If a url ends with a `/` this function will remove it
 */
export const serializeUrl = (url: string) => {
  const endsWithSlash = url.endsWith("/");

  if (endsWithSlash) return url.slice(0, -1);

  return url;
};

export const createLangQuery = (language?: string, isFirstParam = true) => {
  const param = language ? `languageIsoCode=${language.toUpperCase()}` : "";

  if (isFirstParam) return "?" + param;
  return param;
};
