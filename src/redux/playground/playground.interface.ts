export interface UserPlaygroundData {
  operation: string;
  vars: string;
  headers: string;
}

export interface PlaygroundState extends UserPlaygroundData {
  init: boolean;
  response: string;
  isFetch: boolean;
  error: string[];
  previousData: null | UserPlaygroundData;
}
