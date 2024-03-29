import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { footer } from "../config/config";

const Footer = () => {
  return (
    <footer className="justify-center text-center p-4 print:hidden">
        <div id="velsku" className="noselect">
          <ul className="flex flex-row">
            {footer.map((network) => {
              return (
                <li
                  className="px-2 cursor:pointer hover:text-white transition duration-300"
                  key={network.name}
                >
                  <Link href={network.link || ""}>
                      <FontAwesomeIcon
                        className="w-4 mt-1"
                        icon={network.icon}
                      />
                  </Link>
                </li>
              );
            })}
            <li>
              <a
                id="velsku_sebenji"
                href="https://discord.gg/4KhzRzpmVr"
                target="_blank"
              >
                {"Live chat"}
              </a>
            </li>
          </ul>
        </div>
    </footer>
  );
};

export default Footer;
