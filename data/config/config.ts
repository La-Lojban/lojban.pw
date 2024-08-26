export const site_title = "lojban.pw";
export const site_description = "Lojban language courses, stories";
export const site_url = "https://lojban.pw";
export const site_creator_twitter = "Gleki Arxokuna";

export const CMS_NAME = "Learn Lojban website";
const discordChatUrl = "https://discord.gg/wasp5fj";
import {
  faDiscord,
  faFacebook,
  faReddit,
  faGithub,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons";

export const footer = [
  {
    name: "telegram",
    icon: faTelegram,
    link: "https://t.me/lojban",
  },
  { name: "discord", icon: faDiscord, link: discordChatUrl },
  {
    icon: faFacebook,
    name: "facebook",
    link: "https://facebook.com/groups/lojban",
  },
  {
    name: "github",
    icon: faGithub,
    link: "https://github.com/lagleki/lojban/issues",
  },
  { name: "reddit", icon: faReddit, link: "https://reddit.com/r/lojban" },
];

export const header = [
  { icon: "🎓", "name": "Learn Lojban", url: "/books/learn-lojban" },
  { icon: "💬", name: "Live chat", url: "/articles/live_chat" },
  {
    icon: "📚", name: "Texts",
    url: "/texts",
  },
  { icon: "📕", name: "Full grammar", url: "/articles/complete-lojban-language" },
  { name: "📂📑📑📑", url: "/list" },
];

export const links = [
  {
    rel: "apple-touch-icon",
    sizes: "180x180",
    href: "/assets/icons/lojbo-180.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: "/assets/icons/lojbo-32.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    href: "/assets/icons/lojbo-16.png",
  },
  { rel: "manifest", href: "/assets/favicons/site.webmanifest" },
  {
    rel: "mask-icon",
    href: "/assets/pixra/ralju/pluka_lanci.svg",
    color: "#000000",
  },
  { rel: "shortcut icon", href: "/assets/pixra/ralju/pluka_lanci.svg" },
  // {rel:"alternate", type:"application/rss+xml", href:"/feed.xml"}
];

export const meta = {
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover",
  "application-name": site_title,
  "msapplication-TileColor": "#000000",
  "msapplication-config": "/assets/favicons/browserconfig.xml",
  "theme-color": "#000",
  "og:image": "/assets/pixra/ralju/pluka_lanci.svg",
  "apple-mobile-web-app-capable": "yes",
  "apple-mobile-web-app-status-bar-style": "default",
  "apple-mobile-web-app-title": site_title,
  description: site_description,
  "format-detection": "telephone=no",
  "mobile-web-app-capable": "yes",
  "msapplication-tap-highlight": "no",
  "twitter:card": "summary",
  "twitter:url": site_url,
  "twitter:title": site_title,
  "twitter:description": site_description,
  "twitter:image": "/assets/pixra/ralju/pluka_lanci.svg",
  "twitter:creator": site_creator_twitter,
  "og:type": "website",
  "og:title": site_title,
  "og:description": site_description,
  "og:site_name": site_title,
  "og:url": site_url,
};
