export const home_title = "My website home title";
export const site_title = "My website";
export const site_description = "My website";
export const site_url = "https://lojban.pw";
export const site_creator_twitter = "John Smith";

export const CMS_NAME = "My website title";
export const TEXTS = "Corpus of texts";

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
    link: "https://t.me/blalala",
  },
  { name: "discord", icon: faDiscord, link: "https://discord.gg/123456" },
  {
    icon: faFacebook,
    name: "facebook",
    link: "https://facebook.com/groups/mywebsite",
  },
  {
    name: "github",
    icon: faGithub,
    link: "https://github.com/myname/myrepo/issues",
  },
  { name: "reddit", icon: faReddit, link: "https://reddit.com/r/mywebsite" },
];

export const header = [
  { name: "🎓 Learn", url: "/books/learn", coverImage: "" },
  { name: "💬 Live chat", url: "/articles/chat" },
  { name: "📚 To read", url: "/texts", "og:image": "" },
  { name: "🗂️ All pages", url: "/list" },
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
  { rel: "manifest", href: "/assets/favicons/manifest.json" },
  {
    rel: "mask-icon",
    href: "/assets/pixra/ralju/pluka_lanci.svg",
    color: "#000000",
  },
  { rel: "shortcut icon", href: "/assets/pixra/ralju/pluka_lanci.svg" },
];

export const meta = {
  "application-name": "site_title",
  "msapplication-TileColor": "#000000",
  "msapplication-config": "/assets/favicons/browserconfig.xml",
  "theme-color": "#000",
  "apple-mobile-web-app-capable": "yes",
  "apple-mobile-web-app-status-bar-style": "default",
  "apple-mobile-web-app-title": "site_title",
  description: "site_description",
  "format-detection": "telephone=no",
  "mobile-web-app-capable": "yes",
  "msapplication-tap-highlight": "no",
  "twitter:card": "summary",
  "twitter:url": "site_url",
  "twitter:title": "site_title",
  "twitter:description": "site_description",
  "twitter:image": "/assets/pixra/ralju/pluka_lanci.svg",
  "twitter:creator": "site_creator_twitter",
  "og:image": "/assets/icons/lojbo-512.png",
  "og:type": "website",
  "og:title": "site_title",
  "og:description": "site_description",
  "og:site_name": "site_title",
  "og:url": "site_url",
};
