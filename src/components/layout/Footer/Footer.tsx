import { FOOTER_LINKS, RS_ALT, RS_LINK, RS_PATH } from './FooterConst';
import Image from 'next/image';
import styles from './Footer.module.scss';

export const Footer = (): JSX.Element => {
  const fillLinks = (linksArr: [string, string, number][]): JSX.Element[] =>
    linksArr.map(
      ([name, link, key]): JSX.Element => (
        <a href={link} key={key}>
          {name}
        </a>
      )
    );

  return (
    <footer className={styles.footer}>
      {fillLinks(FOOTER_LINKS)}
      <span>&copy; 2023</span>
      <a className={styles.icon} href={RS_LINK}>
        <Image src={RS_PATH} alt={RS_ALT} width={30} height={25} />
      </a>
    </footer>
  );
};
