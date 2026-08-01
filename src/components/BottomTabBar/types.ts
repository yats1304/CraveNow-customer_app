export interface TabItemProps {
  routeKey: string;
  routeName: string;
  label: string;
  focused: boolean;
  onPress: (routeKey: string, routeName: string) => void;
}
