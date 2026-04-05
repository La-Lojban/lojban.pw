/**
 * SFC-style layout (dependency order: styles → markup → script):
 *   STYLES — Tailwind fragments
 *   MARKUP — presentational pieces
 *   SCRIPT — data + composition
 */
import { memo } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { footer } from "../config/config";

// -----------------------------------------------------------------------------
// STYLES
// -----------------------------------------------------------------------------
const tw = {
  root: "justify-center text-center p-4 print:hidden",
  velsku: "noselect",
  list: "flex flex-row",
  networkLi:
    "px-2 cursor:pointer hover:text-white transition duration-300",
  icon: "w-4 mt-1",
} as const;

// -----------------------------------------------------------------------------
// MARKUP
// -----------------------------------------------------------------------------
function FooterNetworkLink({
  name,
  href,
  icon,
}: {
  name: string;
  href: string;
  icon: IconDefinition;
}) {
  return (
    <li className={tw.networkLi}>
      <Link href={href}>
        <FontAwesomeIcon className={tw.icon} icon={icon} />
      </Link>
    </li>
  );
}

function LiveChatLink() {
  return (
    <li>
      <a
        id="velsku_sebenji"
        href="https://discord.gg/4KhzRzpmVr"
        target="_blank"
      >
        Live chat
      </a>
    </li>
  );
}

// -----------------------------------------------------------------------------
// SCRIPT
// -----------------------------------------------------------------------------
function Footer() {
  return (
    <footer className={tw.root}>
      <div id="velsku" className={tw.velsku}>
        <ul className={tw.list}>
          {footer.map((network) => (
            <FooterNetworkLink
              key={network.name}
              name={network.name}
              href={network.link || ""}
              icon={network.icon}
            />
          ))}
          <LiveChatLink />
        </ul>
      </div>
    </footer>
  );
}

export default memo(Footer);
