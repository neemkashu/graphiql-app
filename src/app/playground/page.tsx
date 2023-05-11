/* eslint-disable no-console */
'use client';
import { useWidthState } from '@/app/playground/page.hook';
import { ResizableContainer } from '@/components/ResizableContainer/ResizableContainer';
import styles from './page.module.scss';

export default function PlaygroundPage(): JSX.Element {
  const isMobileView = useWidthState();

  return (
    <div className={styles.playground}>{isMobileView ? 'mobile' : <ResizableContainer />}</div>
  );
}
