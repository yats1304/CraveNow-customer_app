import { Colors } from "@/components/theme";
import { AppText } from "../Text";

interface Props {
  error: string;
}

export default function InputError({ error }: Props) {
  return (
    <AppText
      variant="caption"
      color={Colors.danger[500]}
      style={{ marginTop: 6 }}
    >
      {error}
    </AppText>
  );
}
