const { withPodfile } = require("@expo/config-plugins");

module.exports = function withFirebaseStaticFramework(config) {
  return withPodfile(config, (podfileConfig) => {
    const podfile = podfileConfig.modResults.contents;
    const setting = "$RNFirebaseAsStaticFramework = true";

    if (!podfile.includes(setting)) {
      podfileConfig.modResults.contents = `${setting}\n${podfile}`;
    }

    const nonModularHeaderSetting = `
    installer.pods_project.targets.each do |target|
      if target.name == "RNFBApp"
        target.build_configurations.each do |build_configuration|
          build_configuration.build_settings["CLANG_ALLOW_NON_MODULAR_INCLUDES_IN_FRAMEWORK_MODULES"] = "YES"
        end
      end
    end
`;

    if (!podfile.includes("CLANG_ALLOW_NON_MODULAR_INCLUDES_IN_FRAMEWORK_MODULES")) {
      podfileConfig.modResults.contents = podfileConfig.modResults.contents.replace(
        "post_install do |installer|",
        `post_install do |installer|${nonModularHeaderSetting}`,
      );
    }

    return podfileConfig;
  });
};
