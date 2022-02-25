import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { InformationScreen } from "./components";
import { useLingui } from "./hooks/useLingui";

function App() {
  const localesLoading = useLingui();

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
