"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  useForm,
} from "@workspace/ui/components/form";

import { credentialsSchema } from "@workspace/validators/credentials";
import { Input } from "@workspace/ui/components/input";
import { useSingIn } from "@/hooks/auth";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();

  const form = useForm({
    schema: credentialsSchema,
  });

  const { mutate: signIn, error } = useSingIn();

  const onSubmit = form.handleSubmit((credentials) =>
    signIn(credentials, {
      onSuccess: () => router.push("/dashboard/crufor"),
    })
  );

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <span>{error?.message}</span>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <button>submit</button>
      </form>
    </Form>
  );
}
