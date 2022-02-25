import ky from "ky";
import React, { useEffect, useState } from "react";
import { InformationScreen } from "./components";

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
  const [sourcesUnderAttack, setSourcesUnderAttack] = useState<
    {
      url: string;
      headers: Record<string, string>;
    }[]
  >([]);

  useEffect(() => {
    //fetch or hardcode sources
  }, []);

  console.log("ehre");

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

  return <InformationScreen />;
}

export default App;
