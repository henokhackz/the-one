import React from "react";
import { PortfolioShell } from "@/components/layout/portfolio-shell";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <PortfolioShell>{children}</PortfolioShell>;
}
