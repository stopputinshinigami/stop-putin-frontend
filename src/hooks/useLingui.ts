import { CompiledMessage } from "@lingui/core/cjs/i18n";
import { i18n } from "@lingui/core";
import { useEffect, useState } from "react";

import { AVAILABLE_LOCALES, PARENT_LOCALES } from "../macros";

const getParentLocale = (locale: string): string => {
  const possibleParent = PARENT_LOCALES[locale];

  if (possibleParent) {
    return possibleParent;
  }

  const localeParts = locale.split("-");

  if (localeParts.length === 1) {
    return localeParts[0] || "en";
  }

  return localeParts.slice(0, localeParts.length - 1).join("-");
};

const getBrowserLocale = (): string => {
  const locale = navigator.languages.reduceRight<string>((acc, locale) => {
    const parentLocale = getParentLocale(locale);

    return AVAILABLE_LOCALES.includes(parentLocale) ? parentLocale : acc;
  }, "root");

  return locale !== "root" ? locale : "en";
};

type Catalogs = Record<string, Record<string, CompiledMessage>>;
const catalogs: Catalogs = {};

const activateLanguage = async (locale: string) => {
  // TODO: remove next line we added multi-languages
  locale = "en";
  if (!catalogs[locale]) {
    const { messages } = await import(
      `@lingui/loader!../../src/locales/${locale}/messages.po`
    );

    i18n.load(locale, messages);
    i18n.activate(locale);
  }
};

export const useLingui = () => {
  const [firstLoading, setFirstLoading] = useState(true);
  useEffect(() => {
    (async () => {
      await activateLanguage(getBrowserLocale());
      if (firstLoading) {
        setFirstLoading(false);
      }
    })();

    const listener = () => {
      (async () => {
        await activateLanguage(getBrowserLocale());
      })();
    };

    window.addEventListener("languagechange", listener);
    return () => {
      window.removeEventListener("languagechange", listener);
    };
  }, []);

  return firstLoading;
};
