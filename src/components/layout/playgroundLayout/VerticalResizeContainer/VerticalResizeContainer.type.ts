export type VerticalContainerSize = [string, number] | number[];

export type VerticalContainerProps = {
  children: JSX.Element[];
  lsKey: string;
  isMobile?: boolean;
};
