/*import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
export default defineConfig({
    output: 'server', // Debe ser 'server' si usas el adaptador 'node'
    adapter: node({
        mode: 'standalone' 
    }),
    devToolbar: {
        enabled: false
    },
    customCss: ['./src/styles/all.min.css'],
});*/

import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
    output: 'static',
    devToolbar: {
        enabled: false
    },
    customCss: ['./src/styles/all.min.css'],
    site: "https://logimportperusac.com",
    integrations: [sitemap()]
});