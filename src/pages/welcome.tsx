import { useEffect } from "react";

import { useRouter } from "next/router";

const Post = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace("/en" + router.asPath);
  }, []);
  return <></>;
};

export default Post;
