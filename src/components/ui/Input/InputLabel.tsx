import { AppText } from "../Text";

interface Props {
  label: string;
}

export default function InputLabel({ label }: Props) {
  return (
    <AppText
      variant="bodySmall"
      weight="600"
      className="text-gray-900 dark:text-gray-100"
      style={{ marginBottom: 8 }}
    >
      {label}
    </AppText>
  );
}
