import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NotFoundRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.push("/not-found");
  }, [router]);
}
