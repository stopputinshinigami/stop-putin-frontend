export type ParentLocales = Record<Locale, string | undefined>;

export type Counties = Record<
  Locale,
  Record<
    Country,
    {
      code: Country;
      name: string;
    }
  >
>;

enum WEEK_DAY {
  MONDAY = "mon",
  TUESDAY = "tue",
  WEDNESDAY = "wed",
  THURSDAY = "thu",
  FRIDAY = "fri",
  SATURDAY = "sat",
  SUNDAY = "sun",
}

export type WeekDayOrder = Record<Country, WEEK_DAY>;

export type Languages = Record<
  Locale,
  Record<
    Country,
    {
      code: Country;
      name: string;
    }
  >
>;

export type CURRENCIES = Record<
  Locale,
  Record<
    Currency,
    {
      displayName: {
        few: string;
        many: string;
        one: string;
        other: string;
      };
      name: string;
      symbol: string;
      variant: string;
    }
  >
>;

type DayPeriodsType = "afternoon1" | "evening1" | "midnight" | "morning1" | "night1" | "noon";
type DayNamesType = "abbreviated" | "narrow" | "wide";

type PeriodOfDays = Record<
  Locale,
  {
    dayPeriods: Record<DayPeriodsType, Record<string, string>>;
    dayNames: Record<DayNamesType, Record<string, string>>;
  }
>;

export function getParentLocales(): ParentLocales;
export function getCountries(): Counties;
export function getWeekDayOrder(): WeekDayOrder;
export function getLanguages(): Languages;
export function getCurrenciesAdditionalInformation(): CURRENCIES;
export function getPeriodOfDays(): PeriodOfDays;
export function getGeneratedKeys(): string;
