/*const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');
const defaultConfig = getDefaultConfig(__dirname);
const postcssPlugins = require('./postcss.config').plugins;
const exclusionList = [
    /node_modules[\/\\]antd-mobile[\/\\].
  ];
  'react-native-css-transformer'
module.exports = {
  ...defaultConfig,
  transformer: {
    babelTransformerPath: require.resolve('react-native-css-transformer'),
    getSourceExts: () => ['jsx', 'js', 'ts', 'tsx'],
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
      // Agrega aquí los plugins de PostCSS
      postCSSConfig: {
        options: {},
        plugins: postcssPlugins.plugins,
      },
    }),
    // Add this to exclude antd-mobile from the CSS transformation
    getTransformModulePath() {
      return require.resolve('react-native/packager/transformer') // or any other transformer
    },
    // Add this to exclude antd-mobile from the module ID transformation
    async getTransformedFilepathAsync(filePath, transformerOptions) {
      const { sha1 } = await transformer.getTransformOptions();
      return sha1 ? `${sha1}-${filePath}` : filePath;
    },
    transformerConfig: {
      // Add this to exclude antd-mobile from the CSS transformation
      exclude: exclusionList,
    }
  },
  resolver: {
    ...defaultConfig.resolver,
    sourceExts: [...defaultConfig.resolver.sourceExts, 'css'],
    exclude: exclusionList,
  },
  watchFolders: [
    // Añade aquí cualquier directorio que quieras que se observe en tiempo real
    path.resolve(__dirname, 'node_modules', 'antd-mobile')
  ]
}*/