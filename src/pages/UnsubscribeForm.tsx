import { z } from "astro/zod";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";

export default function UnsubscribeForm() {
  const [userEmail, setUserEmail] = useState<null | string>(null);

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (globalThis.window) {
      const urlParams = new URLSearchParams(globalThis.window.location.search);

      const userMail = urlParams.get("userMail");

      setUserEmail(userMail);
    }
  }, []);

  const unsubscribe = useCallback(async () => {
    const result = z.string().email().safeParse(userEmail);
    if (result.success) {
      const response = await fetch(
        `${import.meta.env.PUBLIC_STOATI_URL}/shops/${
          import.meta.env.PUBLIC_STOATI_ID
        }/newsletters/list/01ec4056-d07b-4e57-868e-50880a9c6f85/email/${result.data}`,
        {
          method: "delete",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setSuccess(true);
      }
    }
  }, [userEmail]);

  if (success) {
    return (
      <div>
        <h2>Vous avez bien été désabonné. Bonne continuation !</h2>
      </div>
    );
  }

  return (
    <div>
      <h2>Souhaitez-vous vous désabonner de notre newsletter ?</h2>
      <Button onClick={() => unsubscribe()}>Se désinscrire</Button>
    </div>
  );
}
