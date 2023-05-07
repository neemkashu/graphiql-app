import { ButtonStyle } from '@/common';

export type MainButtonProps = {
  action?: () => void;
  style: ButtonStyle;
  disabled: boolean;
  children: string;
};
