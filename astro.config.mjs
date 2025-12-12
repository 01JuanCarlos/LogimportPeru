// astro.config.mjs
import { defineConfig } from 'astro/config';
import node from '@astrojs/node/index.js';

export default defineConfig({
    output: 'server', // Debe ser 'server' si usas el adaptador 'node'
    adapter: node({
        mode: 'standalone' 
    }),
    devToolbar: {
        enabled: false
    },
    customCss: ['./src/styles/all.min.css'],
});