import { Colors } from "@/components/theme";
import { AppText } from "../Text";

interface Props {
  text: string;
}

export default function InputHelper({ text }: Props) {
  return (
    <AppText
      variant="caption"
      color={Colors.gray[500]}
      style={{ marginTop: 6 }}
    >
      {text}
    </AppText>
  );
}
