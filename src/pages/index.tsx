import { useRouter } from "next/router";
import { useEffect } from "react";

function Index() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/en/welcome");
  }, [router]);

  return null;
}

export default Index;
