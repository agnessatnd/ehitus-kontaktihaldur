"use client";

import { TeamProvider } from "@/components/team-context";

export default function TeamProviderClient({ children }: { children: React.ReactNode }) {
  return <TeamProvider>{children}</TeamProvider>;
}
