# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

3. Configure Google Sign-In environment variables

   ```bash
   cp .env.example .env
   ```

   `EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID` is optional; set it only when the iOS
   OAuth client ID must differ from the one in `GoogleService-Info.plist`.

   In Firebase Authentication, enable the **Google** and **Apple** providers.
   Register the Android package name and SHA-1 certificate, and the iOS bundle ID,
   in the corresponding Google OAuth clients. For Apple, also enable **Sign in with
   Apple** for the app identifier in the Apple Developer portal and configure its
   service ID in Firebase Authentication.

   Social authentication uses native modules and must be tested in a development
   build or production build; it is not supported by Expo Go.

4. Create an iOS Simulator build in the cloud

   ```bash
   npm run build:ios:simulator
   ```

   This build does not require the paid Apple Developer Program, but it can only
   run on an iOS Simulator on a Mac.

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
