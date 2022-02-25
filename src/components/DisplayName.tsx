import { BorderedBox } from "./styles";

export const DisplayName = ({ name }: { name: string }) => {
  return (
    <BorderedBox>
      <div style={{ fontWeight: 600 }}> {name}</div>
    </BorderedBox>
  );
};
