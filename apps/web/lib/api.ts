import { createTuyau } from "@tuyau/client";
import { api } from "backend/api";
import { superjson } from "@tuyau/superjson/plugin";

console.log(process.env.NEXT_PUBLIC_API_URL);

export const tuyau = createTuyau({
  api,
  baseUrl: process.env.NEXT_PUBLIC_API_URL!,
  plugins: [superjson()],
});
