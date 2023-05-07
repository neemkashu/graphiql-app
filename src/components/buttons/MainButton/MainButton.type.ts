import { ButtonStyle } from './MainButton.enum';

export type MainButtonProps = {
  action?: () => void;
  style: ButtonStyle;
  disabled: boolean;
  children: string;
};
