import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { footer } from "../config/config";

const Footer = () => {
  return (
    <footer className="justify-center text-center p-4 print:hidden" role="contentinfo" aria-label="Site footer">
        <div id="velsku" className="noselect">
          <ul className="flex flex-row" role="list">
            {footer.map((network) => {
              return (
                <li
                  className="px-2 cursor:pointer hover:text-white transition duration-300"
                  key={network.name}
                >
                  <Link 
                    href={network.link || ""}
                    aria-label={`Visit our ${network.name} page`}
                    className="focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 rounded"
                  >
                      <FontAwesomeIcon
                        className="w-4 mt-1"
                        icon={network.icon}
                        aria-hidden="true"
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
                rel="noopener noreferrer"
                className="focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 rounded px-2"
                aria-label="Join our Discord live chat"
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
