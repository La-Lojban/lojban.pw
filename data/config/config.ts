export const site_title = "Lojban.pw"
export const home_title = "Lojban language documentation"

export const CMS_NAME = "Lojban made easy"
import {
  faDiscord,
  faFacebook,
  faReddit,
  faGithub,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons"

export const footer = [
  {
    name: "telegram",
    icon: faTelegram,
    link: "https://t.me/lojban",
  },
  { name: "discord", icon: faDiscord, link: "https://discord.gg/wasp5fj" },
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
]

export const header = [
  { name: "🎓 Learn Lojban", url: "/books/learn-lojban" },
  { name: "💬 Live chat", url: "/articles/live_chat" },
  { name: "📕 Full grammar", url: "/articles/complete-lojban-language" },
  { name: "📚 All pages", url: "/list" },
]

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
]

export const meta = [
  { name: "msapplication-TileColor", content: "#000000" },
  { name: "msapplication-config", content: "/assets/favicons/browserconfig.xml" },
  { name: "theme-color", content: "#000" },
  { name: "description", content: "Lojban logical language app" },
  { property: "og:image", content: "https://lojban.pw/assets/icons/lojbo.svg" },
]