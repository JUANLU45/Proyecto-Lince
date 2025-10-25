const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Optimizaciones de caché según TECHNOLOGY.md
config.cacheStores = [
  'FileStore',
  {
    type: 'FileStore',
    cacheDirectory: './metro-cache'
  }
];

// Optimizar resolución de assets
config.resolver.assetExts.push(
  'bin', 'txt', 'jpg', 'png', 'json', 'mp3', 'wav', 'aac', 'm4a'
);

// Transformaciones con caché
config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve('metro-react-native-babel-transformer'),
  assetPlugins: ['expo-asset/tools/hashAssetFiles'],
  minifierConfig: {
    mangle: {
      keep_fnames: true,
    },
    output: {
      ascii_only: true,
      quote_keys: true,
      wrap_iife: true,
    },
    sourceMap: {
      includeSources: false,
    },
    toplevel: false,
    compress: {
      reduce_funcs: false,
    },
  }
};

// Configuración de chunking para caché eficiente
config.serializer = {
  ...config.serializer,
  createModuleIdFactory: () => (path) => {
    return require('crypto')
      .createHash('md5')
      .update(path)
      .digest('hex')
      .substring(0, 8);
  }
};

module.exports = config;
