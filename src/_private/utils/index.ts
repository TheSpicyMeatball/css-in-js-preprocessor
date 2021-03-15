export const first = <T=unknown, TDefault=T>(array: T[], defaultValue?: TDefault) : T | TDefault => array && array[0] || defaultValue;

export const isNotNullOrEmpty = <T=unknown>(value: T) : boolean => {
  if (value === null || value === undefined || (typeof value === 'string' && value === '') || (typeof value === 'object' && Object.keys(value).length <= 0)) return false;

  if (Array.isArray(value)) {
    return  value.length > 0;
  }

  return true;
};

export const isNullOrEmpty =  <T=unknown>(value: T) : boolean => value === null || value === undefined || (typeof value === 'string' && value === '') || (Array.isArray(value) && value.length <= 0) || (typeof value === 'object' && Object.keys(value).length <= 0);
