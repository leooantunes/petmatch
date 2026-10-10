const { withPodfile } = require("@expo/config-plugins");

const buildSettings = `
  # RNFirebase imports React Native headers that are not modular headers.
  installer.pods_project.targets.each do |target|
    if target.name.start_with?("RNFB")
      target.build_configurations.each do |build_configuration|
        build_configuration.build_settings["CLANG_ALLOW_NON_MODULAR_INCLUDES_IN_FRAMEWORK_MODULES"] = "YES"
        build_configuration.build_settings["CLANG_WARN_NON_MODULAR_INCLUDE_IN_FRAMEWORK_MODULES"] = "NO"
      end
    end
  end
`;

module.exports = function withFirebaseIosBuildSettings(config) {
  return withPodfile(config, (podfileConfig) => {
    const podfile = podfileConfig.modResults.contents;

    if (podfile.includes("CLANG_WARN_NON_MODULAR_INCLUDE_IN_FRAMEWORK_MODULES")) {
      return podfileConfig;
    }

    const reactNativePostInstall = /react_native_post_install\(installer[^\n]*\)/;
    podfileConfig.modResults.contents = reactNativePostInstall.test(podfile)
      ? podfile.replace(
          reactNativePostInstall,
          (postInstallCall) => `${postInstallCall}${buildSettings}`,
        )
      : podfile.replace(
          "post_install do |installer|",
          `post_install do |installer|${buildSettings}`,
        );

    return podfileConfig;
  });
};
