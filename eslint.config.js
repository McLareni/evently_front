import js from '@eslint/js';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import typescriptEslintParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

export default [
  {
    files: ['**/*.{ts,tsx}'],
    ignores: ['dist', 'build'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
        module: 'readonly',
        __dirname: 'readonly',
        React: true,
        User: true,
        eventType: true,
        RegisterUser: true,
        LoginUser: true,
        RequiredPassword: true,
        RegisterFormInputsPassword: true,
        RegisterFormInputEmail: true,
        UserInfo: true,
        EventPlaceWithGps: true,
      },
      parser: typescriptEslintParser,
      sourceType: 'module',
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      react: react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@typescript-eslint': typescriptEslintPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...typescriptEslintPlugin.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-restricted-imports': 'off',
      '@typescript-eslint/no-restricted-imports': [
        'warn',
        {
          name: 'react-redux',
          importNames: ['useSelector', 'useDispatch'],
          message:
            'Use typed hooks `useAppDispatch` and `useAppSelector` instead.',
        },
      ],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react/prop-types': 'off',
    },
  },
  js.configs.recommended,
];
