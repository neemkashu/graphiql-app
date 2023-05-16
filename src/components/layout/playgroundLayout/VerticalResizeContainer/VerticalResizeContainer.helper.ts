import {
  DEFAULT_VERTICAL_CONTAINER_SIZE,
  HIDE_BTN_ICON_VERTICAL,
  HIDE_PANE_VERTICAL_CONTAINER_SIZE,
  HIDE_VERTICAL_PANE_SIZE,
  MIN_VERTICAL_PANE_SIZE,
  SHOW_BTN_ICON_VERTICAL,
  VerticalContainerSize,
} from '@/components';

export const setButtonIcon = (size: number): string => {
  return size > HIDE_VERTICAL_PANE_SIZE ? HIDE_BTN_ICON_VERTICAL : SHOW_BTN_ICON_VERTICAL;
};

export const setBottomPane = (size: number): VerticalContainerSize => {
  return size >= MIN_VERTICAL_PANE_SIZE
    ? HIDE_PANE_VERTICAL_CONTAINER_SIZE
    : DEFAULT_VERTICAL_CONTAINER_SIZE;
};
