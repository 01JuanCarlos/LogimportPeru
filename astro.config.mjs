// astro.config.mjs
// @ts-nocheck
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify'; // 👈 1. Importa el adaptador

// https://astro.build/config
export default defineConfig({
    // 2. Define el modo de salida como 'server' o 'hybrid'
    // Usa 'server' si *todas* tus páginas son renderizadas bajo demanda (SSR).
    // Usa 'hybrid' si solo *algunas* páginas usan SSR y el resto son estáticas.
    output: 'server', 
    
    // 3. Añade el adaptador de Netlify
    adapter: netlify(), 

    devToolbar: {
        enabled: false
    },
    customCss: ['./src/styles/all.min.css'],
});