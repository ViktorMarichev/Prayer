module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        '@typescript-eslint/no-unused-vars': 'off',
        'no-shadow': 'off',
        'no-undef': 'off',
      },
    },
  ],
};
