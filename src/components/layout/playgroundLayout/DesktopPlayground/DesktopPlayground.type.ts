export type PlaygroundSize = [number, string, string] | number[];

export type DesktopPlaygroundProps = {
  children: {
    documentation: JSX.Element;
    operation: JSX.Element;
    response: JSX.Element;
  };
};
