import { Button, Loader } from "@/components/ui";
import { showToast } from "@/utils";
import { Image } from "expo-image";
import { useEffect } from "react";
import { useGoogleLogin } from "../hooks";

const googleIcon = require("@/assets/images/google.svg");

export function SocialLogin() {
  const { signIn, isPending, error } = useGoogleLogin();

  useEffect(() => {
    if (error) {
      showToast.error(error);
    }
  }, [error]);

  if (isPending) {
    return <Loader variant="overlay" text="Signing in with Google..." />;
  }

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
      loading={isPending}
      disabled={isPending}
      onPress={signIn}
    >
      Continue with Google
    </Button>
  );
}
