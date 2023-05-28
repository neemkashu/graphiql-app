export interface ErrorRespGQL {
  status: number;
  data: ErrorDataGQL;
}

export interface ErrorDataGQL {
  errors: ErrorGQL[];
}

export interface ErrorGQL {
  message: string;
  locations: Location[];
  extensions: Extensions;
}

export interface Location {
  line: number;
  column: number;
}

export interface Extensions {
  code: string;
}
