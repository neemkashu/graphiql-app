import { ALL_LANGUAGES, BASIC_LANGUAGE } from '@/common/const';
import { PageList } from '@/common/enum';
import { usePathname } from 'next/navigation';

export const usePathWithLocale = (pagePath: PageList[]): string[] => {
  const pathName = usePathname();
  const locale = pathName ? pathName.slice(1, 3) : BASIC_LANGUAGE;
  const outputLocale = ALL_LANGUAGES.includes(locale) ? locale : BASIC_LANGUAGE;
  return pagePath.map((page): string => `/${outputLocale}${page}`);
};
