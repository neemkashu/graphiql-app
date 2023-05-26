import styles from './Skeleton.module.scss';

export const Skeleton = ({ count }: { count: number }): JSX.Element => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.title} />
      <div className={styles.description}>
        {Array(count)
          .fill(0)
          .map((_, i) => (
            <div key={i} className={styles.line} />
          ))}
      </div>
      <div className={styles.fields} />
    </div>
  );
};

export default Skeleton;
