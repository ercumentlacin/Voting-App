// metro.config.js
const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const { generate } = require('@storybook/react-native/scripts/generate');

generate({
  configPath: path.resolve(__dirname, './.storybook'),
});

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.transformer.unstable_allowRequireContext = true;

config.resolver.sourceExts.push('mjs');

config.resolver.resolveRequest = (context, moduleName, platform) => {
  const defaultResolveResult = context.resolveRequest(context, moduleName, platform);

  if (
    process.env.STORYBOOK_ENABLED !== 'true' &&
    defaultResolveResult?.filePath?.includes?.('.storybook/')
  ) {
    return {
      type: 'empty',
    };
  }

  return defaultResolveResult;
};


module.exports = config;