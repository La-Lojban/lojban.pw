/**
 * Maps footer config `icon` ids to Simple Icons data (brand SVG paths).
 */
import type { SimpleIcon } from "simple-icons";
import {
  siDiscord,
  siFacebook,
  siGithub,
  siReddit,
  siTelegram,
} from "simple-icons";
import type { FooterBrandId } from "../config/config";

export const footerBrandIcon: Record<FooterBrandId, SimpleIcon> = {
  telegram: siTelegram,
  discord: siDiscord,
  facebook: siFacebook,
  github: siGithub,
  reddit: siReddit,
};
