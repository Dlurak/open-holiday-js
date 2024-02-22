import type {ZodType} from 'zod'

type ZodSchema<T> = ZodType<T, any>;

/**
 * Fetches JSON data from the specified URL and validates it against the
 * provided schema.
 *
 * @template T - The type of data expected from the JSON response.
 * @param url - The URL to fetch JSON data from.
 * @param schema - The Zod schema used to validate the JSON data.
 * @returns A promise that resolves with the parsed JSON data.
 * @throws {Error} If the HTTP request fails or the response is not valid JSON.
 */
export async function requestJson<T>(url: string, schema: ZodSchema<T>) {
  const raw = await fetch(url, {headers : {'accept' : 'text/json'}});

  if (!raw.ok)
    throw new Error(`Request was not successful (${raw.status})`);

  const unparsedContent = await raw.json();

  return schema.parse(unparsedContent);
}
