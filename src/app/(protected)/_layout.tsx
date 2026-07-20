import { useAuth } from "@/features/auth";
import { Redirect, Slot } from "expo-router";

export default function ProtectedLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href={"/(auth)/welcome" as any} />;
  }

  return <Slot />;
}
