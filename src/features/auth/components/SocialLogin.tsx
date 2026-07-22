import { Button } from "@/components/ui";
import { Image } from "expo-image";

const googleIcon = require("@/assets/images/google.svg");

export function SocialLogin() {
  return (
    <Button
      variant="outline"
      leftIcon={
        <Image
          source={googleIcon}
          style={{ width: 20, height: 20 }}
          contentFit="contain"
        />
      }
      fullWidth
      onPress={() => {}}
    >
      Continue with Google
    </Button>
  );
}
