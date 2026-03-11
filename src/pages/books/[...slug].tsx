import { useEffect } from "react";
import { useRouter } from "next/router";

function BooksRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/en" + router.asPath);
  }, [router]);

  return null;
}

export default BooksRedirect;
