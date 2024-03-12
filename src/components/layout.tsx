import React, { useState, useEffect } from "react";
import Footer from "./footer";
import Meta from "./meta";
import { debounce } from "../lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

type Props = {
  children: React.ReactNode;
  meta?: { [key: string]: string | undefined };
};

const Layout = ({ children, meta }: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  const checkScrollTop = debounce(() => {
    if (window.scrollY > 60) {
      setIsVisible(true);
    } else if (window.scrollY <= 60) {
      setIsVisible(false);
    }
  }, 100);

  // Function to handle the click event
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsVisible(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return () => window.removeEventListener("scroll", checkScrollTop);
  }, []);

  return (
    <>
      <Meta meta={meta} />
      <div className="min-h-screen">
        <main>{children}</main>
      </div>
      <Footer />
      {/* Back to top button */}
      <button
        type="button"
        className={[
          isVisible ? null : "hidden",
          "!fixed bottom-5 end-5 rounded-full bg-red-600 p-3 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg",
        ]
          .filter(Boolean)
          .join(" ")}
        id="btn-back-to-top"
        onClick={scrollToTop}
      >
        <span className="[&>svg]:w-4">
          <FontAwesomeIcon className="" icon={faArrowUp} />
        </span>
      </button>
    </>
  );
};

export default Layout;
