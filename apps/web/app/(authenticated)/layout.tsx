import { tuyau } from "@/lib/api";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AuthenticatedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { data } = await tuyau.auth.getSession.$get({
    headers: await headers(),
  });

  if (!data) {
    redirect("/");
  }

  return <div className="flex flex-col p-6">{children}</div>;
}
