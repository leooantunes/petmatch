import { GoogleSignin } from "@react-native-google-signin/google-signin";

// Os IDs vêm de variáveis de ambiente (.env localmente, EAS env nos builds)
// para não ficarem versionados no código.
export const SOCIAL_AUTH_ENV = {
  googleWebClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  googleIosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
} as const;

export function configureGoogleSignIn() {
  if (!SOCIAL_AUTH_ENV.googleWebClientId) {
    console.warn(
      "[socialAuth] EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID não definido. " +
        "O login com Google não vai funcionar até a variável ser configurada.",
    );
  }

  GoogleSignin.configure({
    webClientId: SOCIAL_AUTH_ENV.googleWebClientId,
    iosClientId: SOCIAL_AUTH_ENV.googleIosClientId,
  });
}
