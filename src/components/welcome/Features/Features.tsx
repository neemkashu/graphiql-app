'use client';
import { PageList } from '@/common';
import { usePathWithLocale } from '@/common/hook';
import { FEATURES_LIST, MP4_TYPE, WEBM_TYPE } from '@/components/welcome/Features/Features.const';
import { firebaseAuth } from '@/firebase';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import styles from './Features.module.scss';

export const Features = (): JSX.Element => {
  const [playgroundPage, signInPage] = usePathWithLocale([PageList.playground, PageList.signIn]);
  const isRegister = useAuthState(firebaseAuth);
  const t = useTranslations('Info');
  console.log(isRegister);

  const fillList = (): JSX.Element[] => {
    return FEATURES_LIST.map(([NAME, WEBP_SRC, MP4_SRC], index) => (
      <li className={classNames(styles.item, styles[`num-${index}`])} key={index}>
        <div className={styles.info}>
          <h3 className={styles.name}>
            {t.rich(NAME, {
              strong: (chunks) => <strong className={styles.strong}>{chunks}</strong>,
            })}
          </h3>
          {index === 2 && (
            <Link
              href={isRegister[0] ? playgroundPage : signInPage}
              className={styles.button}
              prefetch={false}
            >
              {'Try it now!'}
            </Link>
          )}
        </div>
        <video className={styles.video} preload="auto" autoPlay loop muted>
          <source src={WEBP_SRC} type={WEBM_TYPE} />
          <source src={MP4_SRC} type={MP4_TYPE} />
        </video>
      </li>
    ));
  };

  return (
    <section className={styles.section}>
      <ul className={styles.list}>{fillList()}</ul>
    </section>
  );
};
