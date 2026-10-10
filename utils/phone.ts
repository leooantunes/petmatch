// DDDs ativos no Brasil (Anatel).
const VALID_DDDS = new Set([
  11, 12, 13, 14, 15, 16, 17, 18, 19,
  21, 22, 24, 27, 28,
  31, 32, 33, 34, 35, 37, 38,
  41, 42, 43, 44, 45, 46, 47, 48, 49,
  51, 53, 54, 55,
  61, 62, 63, 64, 65, 66, 67, 68, 69,
  71, 73, 74, 75, 77, 79,
  81, 82, 83, 84, 85, 86, 87, 88, 89,
  91, 92, 93, 94, 95, 96, 97, 98, 99,
]);

const MOBILE_LENGTH = 11;

export const phoneDigits = (value: string): string =>
  value.replace(/\D/g, "").slice(0, MOBILE_LENGTH);

/** Formata progressivamente como (31) 99999-9999 enquanto o usuário digita. */
export const formatBrazilianMobile = (value: string): string => {
  const digits = phoneDigits(value);

  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

/** Celular brasileiro: DDD válido + 9 dígitos começando com 9. */
export const isValidBrazilianMobile = (value: string): boolean => {
  const digits = value.replace(/\D/g, "");

  return (
    digits.length === MOBILE_LENGTH &&
    VALID_DDDS.has(Number(digits.slice(0, 2))) &&
    digits[2] === "9"
  );
};

export const PHONE_ERROR_MESSAGE =
  "Informe um celular válido com DDD, ex.: (31) 99999-9999.";
