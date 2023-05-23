export interface Args {
  name: string;
  type: string;
}

export interface Field {
  name: string;
  type: string;
  args: Args[];
  description: string;
}

export interface Types {
  name: string;
  description: string;
  fields: Field[] | null;
}
