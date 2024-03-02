import { useEffect } from "react";

import { useRouter } from "next/router";
import { getAllPosts, getPostBySlug } from "../../lib/api";
import markdownToHtml from "../../lib/markdownToHtml";
import { Params } from "../[lang]/[...slug]";

const Post = (pam: any) => {
  const router = useRouter();
  useEffect(() => {
    router.replace("/en" + router.asPath);
  }, []);
  return <div />;
};

export default Post;
