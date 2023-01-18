export const home_title = "My website home title"
export const site_title = "My website"

export const CMS_NAME = "My website title"
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
]

export const header = [
  { name: "🎓 Learn", url: "/books/learn" },
  { name: "💬 Live chat", url: "/articles/chat" },
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
]

export const meta = [
  { name: "msapplication-TileColor", content: "#000000" },
  { name: "msapplication-config", content: "/favicon/browserconfig.xml" },
  { name: "theme-color", content: "#000" },
  { name: "description", content: "My app" },
  { property: "og:image", content: "https://example.come/vreji/img/lojbo.svg" },
]
