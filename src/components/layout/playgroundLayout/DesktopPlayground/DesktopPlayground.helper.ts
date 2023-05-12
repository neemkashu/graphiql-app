import { LS_PLAYGROUND_SIZE_KEY, PlaygroundSize } from '@/components';

export const savePlaygroundSize = (size: PlaygroundSize): void => {
  localStorage.setItem(LS_PLAYGROUND_SIZE_KEY, JSON.stringify(size));
};
