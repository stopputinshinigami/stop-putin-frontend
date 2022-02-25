import { Trans } from "@lingui/macro";
import { DisplayName } from "./DisplayName";
import { TextBlock } from "./styles";

export const targets = [
  {
    name: "MK",
    url: "https://mk.ru",
  },
  {
    name: "KP",
    url: "https://kp.ru",
  },
  {
    name: "Sber",
    url: "https://sberbank.ru",
  },
  {
    name: "VTB",
    url: "https://vtb.com",
  },
];

export interface Target {
  name: string;
  url: string;
}

export const InformationScreen = () => {
  return (
    <TextBlock>
      <Trans>Hello there</Trans>

      {targets.map((target) => (
        <DisplayName {...{ ...target }} />
      ))}
    </TextBlock>
  );
};
