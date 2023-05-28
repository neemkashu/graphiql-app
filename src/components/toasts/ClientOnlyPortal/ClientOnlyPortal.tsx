import { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function ClientOnlyPortal({
  children,
}: {
  children: JSX.Element;
}): JSX.Element | null {
  const ref = useRef<HTMLElement>();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    ref.current = document.body;
    setIsMounted(true);
  }, []);

  return isMounted ? createPortal(children, ref.current ?? document.body) : null;
}
