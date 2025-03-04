import { useMutation, useQuery } from "@tanstack/react-query";
import { tuyau } from "../lib/api";
import { CredentialsSchema } from "@workspace/validators/credentials";
import { useRouter } from "next/navigation";

export const useSingIn = () =>
  useMutation({
    mutationFn: async (credentials: CredentialsSchema) => {
      const { data, error } = await tuyau.auth.signIn.$get({
        query: credentials,
      });
      if (error?.status === 401) {
        throw new Error(error.value.message);
      }
      return data;
    },
  });

export const useSingUp = () =>
  useMutation({
    mutationFn: (credentials: CredentialsSchema) =>
      tuyau.auth.signUp.$post(credentials),
  });

export const useSingOut = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async () => {
      const { data } = await tuyau.auth.signOut.$post();
      if (!data?.success) {
        throw new Error("Algo deu errado ao sair");
      }
    },
    onSuccess: () => router.push("/"),
  });
};

export const useSession = () =>
  useQuery({
    queryKey: ["session"],
    queryFn: () => tuyau.auth.getSession.$get().unwrap(),
  });
