import { useEffect } from "react";
import { BorderedBox } from "./styles";

export const DisplayName = ({ name }: { name: string }) => {
  useEffect(() => {}, []);

  return (
    <BorderedBox>
      <div style={{ fontWeight: 600 }}> {name}</div>
    </BorderedBox>
  );
};
