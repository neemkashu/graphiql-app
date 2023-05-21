export type PlaygroundSize = [number, string, string] | number[];

export type DesktopPlaygroundProps = {
  children: {
    documentation: Promise<JSX.Element>;
    operation: JSX.Element;
    response: JSX.Element;
  };
};
