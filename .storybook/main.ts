import type { StorybookConfig } from '@storybook/nextjs';

import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';

const config: StorybookConfig = {
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@chromatic-com/storybook',
  ],
  core: {
    disableTelemetry: true,
  },
  docs: {},
  framework: {
    name: '@storybook/nextjs',
    options: {
      builder: {},
    },
  },
  staticDirs: [
    '../public',
    {
      from: '../src/pages/_app.tsx',
      to: 'src/pages/_app.tsx',
    },
  ],
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.plugins = [
        ...(config.resolve.plugins || []),
        new TsconfigPathsPlugin({
          extensions: config.resolve.extensions,
        }),
      ];
    }

    return config;
  },
};

export default config;
