import { ActivityIndicator } from "react-native";

interface Props {
  color: string;
}

export default function ButtonLoader({ color }: Props) {
  return <ActivityIndicator color={color} size="small" />;
}
