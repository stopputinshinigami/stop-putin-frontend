import ky from "ky";
import React, { useEffect, useState } from "react";

const callAndRecurse = async (url: string, headers: Record<string, string>) => {
  try {
    await ky.get(url, {
      headers,
    });
  } catch {
    console.log("woohoo");
  } finally {
    await callAndRecurse(url, headers);
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

  useEffect(() => {
    if (!sourcesUnderAttack) {
      return;
    }

    (async () => {
      for await (const source of sourcesUnderAttack) {
        callAndRecurse(source.url, source.headers);
      }
    })();
  }, [sourcesUnderAttack]);

  return <div></div>;
}

export default App;
