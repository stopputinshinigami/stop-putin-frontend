import ky from "ky";
import React, { useEffect, useState } from "react";
import { InformationScreen } from "./components";
import { useLingui } from "./hooks/useLingui";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";

const callAndRecurse = async (url: string, headers: Record<string, string>) => {
  try {
    ky.get(url, {
      headers,
    });
  } catch {
    console.log("woohoo");
  } finally {
    callAndRecurse(url, headers);
  }
};

function App() {
  const localesLoading = useLingui();

  const [sourcesUnderAttack, setSourcesUnderAttack] = useState<
    {
      url: string;
      headers: Record<string, string>;
    }[]
  >([]);

  useEffect(() => {
    //fetch or hardcode sources
  }, []);

  useEffect(() => {
    if (!sourcesUnderAttack.length) {
      return;
    }

    (async () => {
      for await (const source of sourcesUnderAttack) {
        callAndRecurse(source.url, source.headers);
      }
    })();
  }, [sourcesUnderAttack]);

  if (localesLoading) {
    return <></>;
  }

  return (
    <I18nProvider i18n={i18n}>
      <InformationScreen />
    </I18nProvider>
  );
}

export default App;
