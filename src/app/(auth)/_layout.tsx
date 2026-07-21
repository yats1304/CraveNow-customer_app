import { useAuth } from "@/features/auth";
import { Slot } from "expo-router";

export default function AuthLayout() {
  const { isAuthenticated } = useAuth();

  // if (isAuthenticated) {
  //   return <Redirect href={"/(protected)/(tabs)" as any} />;
  // }

  return <Slot />;
}
