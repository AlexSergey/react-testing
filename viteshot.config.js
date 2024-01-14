const playwrightShooter = require('viteshot/shooters/playwright');
const playwright = require('playwright');
const vite = require('vite');

module.exports = {
  framework: {
    type: 'react',
  },
  vite: vite.defineConfig({
    public: 'static',
  }),
  shooter: playwrightShooter(playwright.chromium, {
    // Take each screenshot in two different viewports.
    contexts: {
      laptop: {
        viewport: {
          width: 1366,
          height: 768,
        },
      },
      pixel2: playwright.devices['Pixel 2'],
    },
    output: {
      suffixPath: '__screenshots__/',
    },
  }),
  filePathPattern: './src/**/*.screenshot.@(js|jsx|tsx|vue|svelte)',
};
