export const home_title = "Learn Lojban website";
export const site_title = "My website";
export const site_description = "My website";
export const site_url = "https://lojban.pw";
export const site_creator_twitter = "John Smith";

export const CMS_NAME = "Learn Lojban website";
export const TEXTS = "Corpus of texts";
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
  { name: "🎓 Learn Lojban", url: "/books/learn-lojban" },
  { name: "💬 Live chat", url: "/articles/live_chat" },
  { name: "📚 Texts", url: "/texts", ogImage: "/assets/pixra/ralju/texts.svg" },
  { name: "📕 Full grammar", url: "/articles/complete-lojban-language" },
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
    href: "/assets/icons/lojbo.svg",
    color: "#000000",
  },
  { rel: "shortcut icon", href: "/assets/icons/lojbo.svg" },
  // {rel:"alternate", type:"application/rss+xml", href:"/feed.xml"}
];

export const meta = [
  {
    name: "viewport",
    content:
      "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover",
  },
  { name: "application-name", content: site_title },
  { name: "msapplication-TileColor", content: "#000000" },
  {
    name: "msapplication-config",
    content: "/assets/favicons/browserconfig.xml",
  },
  { name: "theme-color", content: "#000" },
  {
    property: "og:image",
    content: "/assets/icons/lojbo.svg",
  },
  { name: "apple-mobile-web-app-capable", content: "yes" },
  { name: "apple-mobile-web-app-status-bar-style", content: "default" },

  { name: "apple-mobile-web-app-title", content: site_title },
  { name: "description", content: site_description },
  { name: "format-detection", content: "telephone=no" },
  { name: "mobile-web-app-capable", content: "yes" },
  { name: "msapplication-tap-highlight", content: "no" },

  { name: "twitter:card", content: "summary" },
  { name: "twitter:url", content: site_url },
  { name: "twitter:title", content: site_title },
  { name: "twitter:description", content: site_description },
  {
    name: "twitter:image",
    content: "/assets/icons/lojbo.svg",
  },
  { name: "twitter:creator", content: site_creator_twitter },
  { property: "og:type", content: "website" },
  { property: "og:title", content: site_title },
  { property: "og:description", content: site_description },
  { property: "og:site_name", content: site_title },
  { property: "og:url", content: site_url },
  { property: "og:image", content: "/assets/icons/lojbo-512.png" },
];
