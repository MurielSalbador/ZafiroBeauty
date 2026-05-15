export async function createContext() {
  return {
    session: null as { user: any } | null,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
