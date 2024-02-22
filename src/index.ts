import { countryApiResponse } from "./schemas/country";
import { requestJson } from "./utils/request";
import { serializeUrl } from "./utils/url";

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
    const param = language ? `?languageIsoCode=${language.toUpperCase()}` : "";
    const url = `${this.url}/Countries${param}`;

    return requestJson(url, countryApiResponse);
  }

  /**
   * Not implemented yet!
   */
  getLangs() {}

  /**
   * Not implemented yet!
   */
  getSubdivisions() {}

  /**
   * Not implemented yet!
   */
  getPublicHolidays() {}

  /**
   * Not implemented yet!
   */
  getSchoolcHolidays() {}
}
