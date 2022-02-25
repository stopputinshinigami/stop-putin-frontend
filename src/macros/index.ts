import getAvailableLocalesMacro from "./get-available-locales.macro";
import { getLanguages, getParentLocales } from "./get-cldr-data.macro";

export enum WEEK_DAY {
  MONDAY = "mon",
  TUESDAY = "tue",
  WEDNESDAY = "wed",
  THURSDAY = "thu",
  FRIDAY = "fri",
  SATURDAY = "sat",
  SUNDAY = "sun",
}

export const AVAILABLE_LOCALES = getAvailableLocalesMacro();
export const PARENT_LOCALES = getParentLocales();
export const LANGUAGES_LOCALES = getLanguages();
