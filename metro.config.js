const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const path = require("path");
  
// const projectRoot = __dirname;
const config = getDefaultConfig(__dirname);

// https://github.com/supabase/supabase-js/issues/1258#issuecomment-2801695478
config.resolver = {
	...config.resolver,
	unstable_conditionNames: ["browser"],
	unstable_enablePackageExports: false,
};

config.resolver.nodeModulesPaths = [path.resolve(__dirname, "node_modules")];
  
module.exports = withNativeWind(config, { input: './global.css' })