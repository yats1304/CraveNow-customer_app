import { Button } from "@/components/ui";
import { AntDesign } from "@expo/vector-icons";

export function SocialLogin() {
  return (
    <Button
      variant="outline"
      leftIcon={<AntDesign name="google" size={20} color="#111827" />}
      fullWidth
      onPress={() => {}}
    >
      Continue with Google
    </Button>
  );
}
