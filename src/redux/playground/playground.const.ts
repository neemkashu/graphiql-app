import { PlaygroundState } from '@/redux';

export const initialState: PlaygroundState = {
  init: true,
  operation: '',
  response: '',
  vars: '',
  headers: '',
  isFetch: false,
  error: [],
};

export const UNKNOWN_ERROR = 'Something went wrong :(';
