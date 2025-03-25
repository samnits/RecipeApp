module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'nativewind/babel', // Add NativeWind plugin
      'react-native-reanimated/plugin', // React Native Reanimated plugin (must be last)
    ],
  };
};
