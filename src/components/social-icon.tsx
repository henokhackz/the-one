import { FaGithub, FaLinkedin, FaTelegram, FaUpwork } from "react-icons/fa6";
import type { IconType } from "react-icons";

import type { SocialIconName } from "@/lib/data";

const ICONS: Record<SocialIconName, IconType> = {
  github: FaGithub,
  linkedin: FaLinkedin,
  telegram: FaTelegram,
  upwork: FaUpwork,
};

export function SocialIcon({
  name,
  className,
}: {
  name: SocialIconName;
  className?: string;
}) {
  const Icon = ICONS[name];
  return <Icon className={className} aria-hidden="true" />;
}
