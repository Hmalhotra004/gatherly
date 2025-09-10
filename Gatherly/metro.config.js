const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

config.resolver.extraNodeModules = {
  "@": __dirname + "/src",
};

module.exports = withNativeWind(config, { input: "./src/app/global.css" });
