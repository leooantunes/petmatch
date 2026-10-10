import { GoogleSignin } from "@react-native-google-signin/google-signin";

const GOOGLE_WEB_CLIENT_ID =
  "591812364758-0hnh317ev067mcpo66ml27rindnml34g.apps.googleusercontent.com";

export const SOCIAL_AUTH_ENV = {
  googleWebClientId: GOOGLE_WEB_CLIENT_ID,
  googleIosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
} as const;

export function configureGoogleSignIn() {
  GoogleSignin.configure({
    webClientId: SOCIAL_AUTH_ENV.googleWebClientId,
    iosClientId: SOCIAL_AUTH_ENV.googleIosClientId,
  });
}
