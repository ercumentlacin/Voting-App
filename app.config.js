module.exports = {
  expo: {
    name: "eventy",
    slug: "eventy",
    version: "3.0.0",
    orientation: "portrait",
    icon: "./src/assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./src/assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      package: "com.eventy.app",
      versionCode: 3,
      adaptiveIcon: {
        foregroundImage: "./src/assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      favicon: "./src/assets/favicon.png",
    },
    extra: {
      storybookEnabled: process.env.STORYBOOK_ENABLED,
      eas: {
        projectId: "e0ad5364-e198-4b7e-b9b2-0740ca21aab4",
      },
    },
  },
  updates: {
    url: "https://u.expo.dev/e0ad5364-e198-4b7e-b9b2-0740ca21aab4",
  },
  runtimeVersion: {
    policy: "appVersion",
  },
};
