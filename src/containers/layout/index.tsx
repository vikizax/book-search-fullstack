import { ReactNode } from "react";
import Navbar from "../../components/navbar";
import { useLocation } from "react-router-dom";

import { AppShell } from "@mantine/core";
export default function LayoutContainer({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();

  return (
    <AppShell header={<Navbar loginPage={pathname === "/"} />}>
      {children}
    </AppShell>
  );
}
