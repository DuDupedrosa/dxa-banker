import { defineConfig } from "cypress";

export default defineConfig({
  video: false,
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportHeight: 720,
    viewportWidth: 1280
  },
});
