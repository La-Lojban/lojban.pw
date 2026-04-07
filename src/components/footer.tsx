/**
 * SFC-style layout (dependency order: styles → markup → script):
 *   STYLES — Tailwind fragments
 *   MARKUP — presentational pieces
 *   SCRIPT — data + composition
 */
import { memo } from "react";
import Link from "next/link";
import { footer, type FooterBrandId } from "../config/config";
import { BrandIcon } from "./brand-icon";
import { footerBrandIcon } from "./footer-icons";

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
  brandId,
}: {
  name: string;
  href: string;
  brandId: FooterBrandId;
}) {
  const icon = footerBrandIcon[brandId];
  return (
    <li className={tw.networkLi}>
      <Link href={href} aria-label={name}>
        <BrandIcon className={tw.icon} icon={icon} />
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
              brandId={network.icon}
            />
          ))}
          <LiveChatLink />
        </ul>
      </div>
    </footer>
  );
}

export default memo(Footer);
