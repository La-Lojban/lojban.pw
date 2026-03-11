import { useEffect } from "react";
import { useRouter } from "next/router";

function ListRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/en" + router.asPath);
  }, [router]);

  return null;
}

export default ListRedirect;
