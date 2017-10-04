interface Error {
  code: number | null;
  message: string;
}

interface FieldError extends Error {
  errors: {[key: string]: string[]};
}

export {Error, FieldError};
