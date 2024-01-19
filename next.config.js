/** @type {import('next').NextConfig} */
const { withTamagui } = require("@tamagui/next-plugin");

const boolVals = {
  true: true,
  false: false,
};

const disableExtraction =
  boolVals[process.env.DISABLE_EXTRACTION] ??
  process.env.NODE_ENV === "development";

const plugins = [
  withTamagui({
    config: "./tamagui.config.ts",
    components: ["tamagui"],
    importsWhitelist: ["constants.js", "colors.js"],
    outputCSS:
      process.env.NODE_ENV === "production" ? "./public/tamagui.css" : null,
    logTimings: true,
    disableExtraction,
    excludeReactNativeWebExports: [
      "Switch",
      "ProgressBar",
      "Picker",
      "CheckBox",
      "Touchable",
    ],
  }),
];

module.exports = function () {
  /** @type {import('next').NextConfig} */
  let config = {
    reactStrictMode: true,
    typescript: {
      ignoreBuildErrors: true,
    },
    modularizeImports: {
      "@tamagui/lucide-icons": {
        transform: `@tamagui/lucide-icons/dist/esm/icons/{{kebabCase member}}`,
        skipDefaultConversion: true,
      },
    },
    transpilePackages: ["solito", "react-native-web"],
    experimental: {
      scrollRestoration: true,
    },
  };

  for (const plugin of plugins) {
    config = {
      ...config,
      ...plugin(config),
    };
  }

  return config;
};
