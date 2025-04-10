import { useForm, useWatch } from "react-hook-form";
import Altcha from "./Altcha";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const FormSchema = z.object({
  email: z.string().email(),
  challenge: z.any(),
});

export default function ContactForm({
  apiUrl,
  applicationId,
}: {
  apiUrl: string;
  applicationId: string;
}) {
  const [messageSent, setMessageSent] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      challenge: null,
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const response = await fetch(
      `${apiUrl}/applications/${applicationId}/newsletters/list/93f7fbf8-e641-43f0-a0fb-6fc5e50bc845/subscribe`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (response.ok) {
      setMessageSent(true);
    }
  };

  const challenge = useWatch({ control: form.control, name: "challenge" });

  if (messageSent) {
    return (
      <div className="max-w-md w-full space-y-6 flex flex-col items-center justify-stretch">
        Merci pour votre inscription !!
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          return form.handleSubmit(onSubmit)();
        }}
        className="max-w-md w-full space-y-6 flex flex-col items-center justify-stretch"
      >
        <h2>Abonnez-vous à notre newsletter pour suivre nos aventures</h2>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Votre adresse mail</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="challenge"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Altcha
                  onValueChange={(val) => {
                    field.onChange(val);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={challenge === null}>S'inscrire</Button>
      </form>
    </Form>
  );
}
