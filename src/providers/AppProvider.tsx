import { PropsWithChildren } from "react";

import { QueryProvider } from "./QueryProvider";
import { ReduxProvider } from "./ReduxProvider";

export function AppProvider({ children }: PropsWithChildren) {
  return (
    <ReduxProvider>
      <QueryProvider>{children}</QueryProvider>
    </ReduxProvider>
  );
}
