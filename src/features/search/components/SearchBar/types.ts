export interface SearchHeaderProps {
  value: string;
  onChangeText: (text: string) => void;
  onBackPress: () => void;
  onClearPress?: () => void;
  onSubmitEditing?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
  editable?: boolean;
}
