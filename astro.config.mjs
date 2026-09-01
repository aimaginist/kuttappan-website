import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://kuttappan.in',
  output: 'static',
  trailingSlash: 'never',
  devToolbar: {enabled: false},
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
