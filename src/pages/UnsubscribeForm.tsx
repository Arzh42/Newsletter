import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";

export default function UnsubscribeForm() {
  const [user, setUser] = useState<null | {
    id: string;
    listId: string;
  }>(null);

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (globalThis.window) {
      const urlParams = new URLSearchParams(globalThis.window.location.search);

      const userMailId = urlParams.get("userId");
      const listId = urlParams.get("listId");

      if (listId && userMailId) {
        setUser({ id: userMailId, listId });
      }
    }
  }, []);

  const unsubscribe = useCallback(async () => {
    if (user) {
      const response = await fetch(
        `${import.meta.env.PUBLIC_STOATI_URL}/shops/${
          import.meta.env.PUBLIC_STOATI_ID
        }/newsletters/list/${user.listId}/email/${user.id}`,
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
  }, [user]);

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
      {user && <Button onClick={() => unsubscribe()}>Se désinscrire</Button>}
    </div>
  );
}
