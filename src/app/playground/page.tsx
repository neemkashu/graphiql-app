import ResizableContainer from '@/components/ResizableContainer/ResizableContainer';
import styles from './page.module.scss';

export default function PlaygroundPage(): JSX.Element {
  return (
    <div className={styles.playground}>
      <ResizableContainer></ResizableContainer>
    </div>
  );
}
