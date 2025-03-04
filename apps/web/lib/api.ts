import { createTuyau } from "@tuyau/client";
import { ApiDefinition } from "backend/api";
import { superjson } from "@tuyau/superjson/plugin";

export const tuyau = createTuyau<{ definition: ApiDefinition }>({
  baseUrl: process.env.NEXT_PUBLIC_API_URL!,
  credentials: "include",
  plugins: [superjson()],
});
