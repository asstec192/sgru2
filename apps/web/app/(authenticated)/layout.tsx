import { ReactNode } from "react";

export default function AuthenticatedLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="flex flex-col p-6">{children}</div>;
}
