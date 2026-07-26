type AuthEvent = "sessionExpired" | "loggedOut" | "loggedIn";
type Listener = () => void;

class AuthEvents {
  private listeners = new Map<AuthEvent, Set<Listener>>();

  on(event: AuthEvent, fn: Listener): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }

    this.listeners.get(event)!.add(fn);

    return () => {
      this.listeners.get(event)?.delete(fn);
    };
  }

  emit(event: AuthEvent): void {
    this.listeners.get(event)?.forEach((fn) => fn());
  }
}

export const authEvents = new AuthEvents();
