import { textPrimaryLogo } from "./text-primary-logo";
import { logoPrimary } from "./logo-primary";
import { logo } from "./logo";
import { textLogo } from "./text-logo";
import { textSecondaryLogo } from "./text-secondary-logo";
import { usersIcon } from "./users";
import { heart } from "./heart-icon";
import { star } from "./base-icon";
import { chevronLeft, left, right } from './arrow-icon';
import { phone, apple,google, facebook } from "./social-icon";

export interface IIconProps {
  w?: number | string
  h?: number | string
  stroke?: string
  color?: string
  className?: string
  onClick?: (e?: any) => void
}

export const Icons = {
  logo,
  textLogo,
  textSecondaryLogo,
  logoPrimary,
  textPrimaryLogo,
  usersIcon,
  heart,
  star,
  chevronLeft,
  left,
  right,
  phone,
  apple,
  google,
  facebook,
}
