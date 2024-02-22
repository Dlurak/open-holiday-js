import { expect, describe, it } from "vitest";
import { parseDate, stringifyDate } from "../src/utils/date";

describe("parseDate", () => {
  it("works", () => {
    expect(parseDate("2022-01-01")).toStrictEqual(new Date(2022, 0, 1));
    expect(parseDate("2022-12-31")).toStrictEqual(new Date(2022, 11, 31));
    expect(parseDate("2023-01-01")).toStrictEqual(new Date(2023, 0, 1));
  });

  it("works for the 29th february", () => {
    expect(parseDate("2024-02-29")).toStrictEqual(new Date(2024, 1, 29));
  });
});

describe("stringifyDate", () => {
  it("works", () => {
    const now = new Date();

    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();

    const today = new Date(year, month, day);

    expect(parseDate(stringifyDate(new Date()))).toStrictEqual(today);
  });
});
