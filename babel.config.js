module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
        alias: {
          '@components': './src/components',
          '@svg': './src/assets/svg',
          '@types': './src/types',
        },
      },
    ],
  ],
};
