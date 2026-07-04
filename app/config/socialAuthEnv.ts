const GOOGLE_WEB_CLIENT_ID =
  "591812364758-0hnh317ev067mcpo66ml27rindnml34g.apps.googleusercontent.com";

export const SOCIAL_AUTH_ENV = {
  googleWebClientId: GOOGLE_WEB_CLIENT_ID,
  googleAndroidClientId:
    process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID ?? GOOGLE_WEB_CLIENT_ID,
  googleIosClientId:
    process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID ?? GOOGLE_WEB_CLIENT_ID,
  facebookAppId: process.env.EXPO_PUBLIC_FACEBOOK_APP_ID ?? "",
} as const;

export const getMissingSocialEnvVars = () => {
  const missingRecommended: string[] = [];
  const missingRequired: string[] = [];

  if (!process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID) {
    missingRecommended.push("EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID");
  }

  if (!process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID) {
    missingRecommended.push("EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID");
  }

  if (!SOCIAL_AUTH_ENV.facebookAppId) {
    missingRequired.push("EXPO_PUBLIC_FACEBOOK_APP_ID");
  }

  return {
    missingRecommended,
    missingRequired,
    hasMissingConfig:
      missingRecommended.length > 0 || missingRequired.length > 0,
  };
};
