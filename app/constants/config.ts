export const API_ENDPOINTS = {
  DOG_BREEDS: "https://dog.ceo/api/breeds/list/all",
  CAT_BREEDS: "https://api.thecatapi.com/v1/breeds",
};

export const PETS_CONFIG = {
  PHOTO_QUALITY: 0.7,
  MAX_PHOTOS: 10,
  MIN_PHOTOS: 1,
  PETS_PER_PAGE: 10,
};

export const AGE_RANGES = [
  "0-1 ano",
  "1-3 anos",
  "4-6 anos",
  "7-9 anos",
  "10-12 anos",
  "13+ anos",
  "Idade desconhecida",
] as const;

export const PET_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
  ADOPTED: "adopted",
} as const;

export const FIREBASE_RETRY = {
  MAX_RETRIES: 3,
  DELAY_MS: 1000,
} as const;

export const DEFAULT_IMAGES = {
  PROFILE: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
  PET: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80",
} as const;

export const PASSWORD_RULES = {
  MIN_LENGTH: 8,
} as const;

/**
 * Valida a senha de cadastro. Retorna a mensagem de erro, ou null se ok.
 * Exige tamanho mínimo e ao menos uma letra e um número.
 */
export function validatePassword(password: string): string | null {
  if (password.length < PASSWORD_RULES.MIN_LENGTH) {
    return `A senha deve ter no mínimo ${PASSWORD_RULES.MIN_LENGTH} caracteres.`;
  }
  if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
    return "A senha deve conter letras e números.";
  }
  return null;
}
