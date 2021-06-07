export const EXAMPLE_PATH = "Lojban.pw"
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
    link: "https://t.me/joinchat/BLVsYz3hCF8mCAb6fzW1Rw",
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
    href: "/vreji/img/lojbo-180.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: "/vreji/img/lojbo-32.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    href: "/vreji/img/lojbo-16.png",
  },
  { rel: "manifest", href: "/favicon/site.webmanifest" },
  {
    rel: "mask-icon",
    href: "/vreji/img/lojbo.svg",
    color: "#000000",
  },
  { rel: "shortcut icon", href: "/vreji/img/lojbo.svg" },
  // {rel:"alternate", type:"application/rss+xml", href:"/feed.xml"}
]

export const meta = [
  { name: "msapplication-TileColor", content: "#000000" },
  { name: "msapplication-config", content: "/favicon/browserconfig.xml" },
  { name: "theme-color", content: "#000" },
  { name: "description", content: "Lojban logical language app" },
  { property: "og:image", content: "https://lojban.pw/vreji/img/lojbo.svg" },
]

export const home_title = "Lojban language documentation"
export const site_title = "Lojban language"