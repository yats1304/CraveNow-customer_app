import * as SplashScreen from "expo-splash-screen";
import { ReactNode, useEffect } from "react";

import { useRestoreSession } from "../hooks/useRestoreSession";

interface AuthGateProps {
  children: ReactNode;
}

export function AuthGate({ children }: AuthGateProps) {
  const { isLoading } = useRestoreSession();

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [isLoading]);

  if (isLoading) {
    return null;
  }

  return <>{children}</>;
}
