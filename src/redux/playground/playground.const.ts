import { PlaygroundState } from '@/redux';

export const initialState: PlaygroundState = {
  operation: '',
  response: '',
  vars: '',
  headers: '',
  isFetch: false,
  error: '',
};
