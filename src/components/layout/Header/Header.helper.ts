import { PAGE_SCROLL_GAP } from '@/components';

export const isPageTop = (): boolean => window.pageYOffset > PAGE_SCROLL_GAP;
