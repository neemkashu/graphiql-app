export type VerticalContainerSize = [string, number] | number[];

export type VerticalContainerProps = {
  children: {
    topBlock: JSX.Element;
    bottomBlock: JSX.Element;
  };
  lsKey: string;
};
