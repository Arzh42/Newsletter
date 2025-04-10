import { defineConfig, envField } from 'astro/config';
import react from "@astrojs/react";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  env: {
    schema: {
      PUBLIC_STOATI_ID: envField.string({
        access: "public",
        context: "client",
      }),
      PUBLIC_STOATI_URL: envField.string({
        access: "public",
        context: "client",
      }),
    },
  },
  integrations: [react(), tailwind({
    applyBaseStyles: false,
  })],
  outDir: "./dist"
});