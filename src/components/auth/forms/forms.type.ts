export type LoginData = {
  email: string;
  password: string;
};
export type RegisterData = {
  repeatPassword: string;
} & LoginData;
