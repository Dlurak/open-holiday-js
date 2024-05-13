import { countryApiResponse } from "./schemas/country";
import { holidayApiResponse } from "./schemas/holidays";
import { languagesApiResponse } from "./schemas/languages";
import { subdivisionsApiResponse } from "./schemas/subdivisions";
import { parseDate, stringifyDate } from "./utils/date";
import { requestJson } from "./utils/request";
import { createLangQuery, serializeUrl } from "./utils/url";

interface HolidayOptions {
  url?: string;
}

/**
 * Represents an SDK for interacting with the Open Holiday API.
 */
export class Holiday {
  /**
   * The base URL of the Open Holiday API.
   * This won't have a slash at the end!
   */
  url: string;

  /**
   * Constructs a new instance of the Holiday SDK.
   * @param {HolidayOptions} options - The options for configuring the SDK.
   * @param {string} options.url - The base URL of the Open Holiday API; defaults to `https://openholidaysapi.org`
   */
  constructor({ url }: HolidayOptions = {}) {
    this.url = serializeUrl(url || "https://openholidaysapi.org");
  }

  /**
   * Get all countries
   *
   * [Official docs](https://www.openholidaysapi.org/en/#countries)
   *
   * @param language The optional language to get the country names in.
   *                 If a incorrect is given the data will be in english.
   *                 If no language is given the data will be in all available languages.
   *
   * @returns A promise that resolves in all countries supported.
   */
  getCountries(language?: string) {
    const param = createLangQuery(language);

    const url = `${this.url}/Countries${param}`;

    return requestJson(url, countryApiResponse);
  }

  /**
   * Get all languages
   *
   * @param language The optional language to get the languages names in.
   *                 If a incorrect is given the data will be in english.
   *                 If no language is given the data will be in all available languages.
   *
   * @returns A promise that resolves in all langauges supported.
   */
  getLangs(language?: string) {
    const param = createLangQuery(language);
    const url = `${this.url}/Languages${param}`;

    return requestJson(url, languagesApiResponse);
  }

  /**
   * Get all subdivisions in a state
   *
   * [Official docs](https://www.openholidaysapi.org/en/#subdivisions)
   *
   * @param country The iso-code of the country which subdivisions are in question
   * @param language The language in which to receive the subdivison names
   * @returns A promise that resolves into a list of all subdivions that are important for holidays
   */
  getSubdivisions(country: string, language?: string) {
    const langParam = createLangQuery(language, false);
    const countryParam = `countryIsoCode=${country}`;

    const params = `?${langParam}&${countryParam}`;

    const url = `${this.url}/Subdivisions${params}`;

    return requestJson(url, subdivisionsApiResponse);
  }

  /**
   * Get school holidays
   *
   * [Official docs](https://www.openholidaysapi.org/en/public-holidays)
   *
   * @param country - The iso code of the country
   * @param startDate - The date to beginn the search from
   * @param endDate - The date to end the search at, maximum three years after startDate
   * @param subdivision - Optional administrative unit
   * @param language - The optional language to get all the data in
   *
   * @returns A promise that resolves into the public holidays
   */
  async getPublicHolidays(
    country: string,
    startDate: Date,
    endDate: Date,
    subdivision?: string,
    language?: string,
  ) {
    const paramsArray = [
      createLangQuery(language, false),
      subdivision ? `subdivisionCode=${subdivision}` : "",
      `validFrom=${stringifyDate(startDate)}`,
      `validTo=${stringifyDate(endDate)}`,
      `countryIsoCode=${country}`,
    ].filter((s) => s);

    const params = `?${paramsArray.join("&")}`;

    const url = `${this.url}/PublicHolidays${params}`;

    const data = await requestJson(url, holidayApiResponse);

    const jsNative = data.map((d) => ({
      ...d,
      startDate: parseDate(d.startDate),
      endDate: parseDate(d.endDate),
    }));

    return jsNative;
  }

  /**
   * Get school holidays
   *
   * [Official docs](https://www.openholidaysapi.org/en/#school-holidays)
   *
   * @param country - The iso code of the country
   * @param startDate - The date to beginn the search from
   * @param endDate - The date to end the search at, maximum three years after startDate
   * @param subdivision - Optional administrative unit
   * @param language - The optional language to get all the data in
   *
   * @returns A promise that resolves into the school holidays
   */
  async getSchoolHolidays(
    country: string,
    startDate: Date,
    endDate: Date,
    subdivision?: string,
    language?: string,
  ) {
    const paramsArray = [
      createLangQuery(language, false),
      subdivision ? `subdivisionCode=${subdivision}` : "",
      `validFrom=${stringifyDate(startDate)}`,
      `validTo=${stringifyDate(endDate)}`,
      `countryIsoCode=${country}`,
    ].filter((s) => s);

    const params = `?${paramsArray.join("&")}`;

    const url = `${this.url}/SchoolHolidays${params}`;

    const data = await requestJson(url, holidayApiResponse);

    const jsNative = data.map((d) => ({
      ...d,
      startDate: parseDate(d.startDate),
      endDate: parseDate(d.endDate),
    }));

    return jsNative;
  }
}
