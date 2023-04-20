import crypto from 'crypto';

export const cryptoHash = (data: string) => {
  return crypto.createHash('sha256').update(data).digest('hex');
};

export const generateCode = (len: number) => {
  const digits = '0123456789';
  let otp = '';
  for (let i = 0; i < len; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
};

export const generateOtp = () => {
  return generateCode(6);
};
