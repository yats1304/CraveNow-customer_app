import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { ENV } from "@/config/env";

GoogleSignin.configure({
  webClientId: ENV.GOOGLE_WEB_CLIENT_ID,
});

export async function getGoogleIdToken(): Promise<string> {
  await GoogleSignin.hasPlayServices();
  const response = await GoogleSignin.signIn();
  const idToken = response.data?.idToken;

  if (!idToken) {
    throw new Error("No ID token received from Google authentication.");
  }

  return idToken;
}
