import { test, expect } from "vitest";
import { getFutureDate } from "./get-future-date";

test("increases date with one year", () => {
  const year = new Date().getFullYear();
  const nextYear = year + 1
  expect(getFutureDate(`${year}-08-10`).getFullYear()).toEqual(nextYear);
});
