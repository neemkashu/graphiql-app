import { ResizableContainer } from '@/components';
import styles from './page.module.scss';

export default function PlaygroundPage(): JSX.Element {
  return (
    <div className={styles.playground}>
      <ResizableContainer />
    </div>
  );
}
