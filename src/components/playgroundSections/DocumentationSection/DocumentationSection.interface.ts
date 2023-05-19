export interface Field {
  name: string;
  type: string;
  description: string;
}

export interface Types {
  name: string;
  description: string;
  fields: Field[] | null;
}
