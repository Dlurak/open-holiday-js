import { countryApiResponse } from "./schemas/country";
import { languagesApiResponse } from "./schemas/languages";
import { subdivisionsApiResponse } from "./schemas/subdivisions";
import { requestJson } from "./utils/request";
import { createLangQuery, serializeUrl } from "./utils/url";

interface HolidayOptions {
  url?: string;
}

export class Holiday {
  url: string;

  constructor({ url }: HolidayOptions = {}) {
    this.url = serializeUrl(url || "https://openholidaysapi.org");
  }

  /**
   * Get all countries
   *
   * [Official docs](https://www.openholidaysapi.org/en/#countries)
   */
  getCountries(language?: string) {
    const param = createLangQuery(language);

    const url = `${this.url}/Countries${param}`;

    return requestJson(url, countryApiResponse);
  }

  /**
   * Get all languages
   *
   * [Official docs](https://www.openholidaysapi.org/en/#languages)
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
   */
  getSubdivisions(country: string, language?: string) {
    const langParam = createLangQuery(language, false);
    const countryParam = `countryIsoCode=${country}`;

    const params = `?${langParam}&${countryParam}`;

    const url = `${this.url}/Subdivisions${params}`;

    return requestJson(url, subdivisionsApiResponse);
  }

  /**
   * Not implemented yet!
   */
  getPublicHolidays() {}

  /**
   * Not implemented yet!
   */
  getSchoolcHolidays() {}
}
