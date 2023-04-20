export const PIN_LENGTH = 4;
export const OTP_LENGTH = 6;
export const PASSWORD_MIN_LENGTH = 12;
export const PASSWORD_MAX_LENGTH = 64;

export enum USER_TYPE {
  'USER' = 'user',
  'ADMIN' = 'admin',
  'SUPER_ADMIN' = 'super-admin',
}

export enum TICKET_CLASS {
  'FIRST_CLASS' = 'first_class',
  'SECOND_CLASS' = 'second_class',
  'ECONOMY' = 'economy',
  'STANDARD' = 'standard',
}

export enum TICKET_CLASS_REF {
  'first_class' = 'FC',
  'second_class' = 'SC',
  'economy' = 'ECO',
  'standard' = 'STD',
}
