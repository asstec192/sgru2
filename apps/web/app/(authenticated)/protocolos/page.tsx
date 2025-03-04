import { tuyau } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function ProtocolosPage() {
  const { data } = await tuyau.emergencies.$get({
    //@ts-expect-error date are stringfied
    query: {
      from: new Date("2025-01-01"),
      to: new Date("2025-01-30"),
    },
  });
  return <div>{JSON.stringify(data)}</div>;
}
