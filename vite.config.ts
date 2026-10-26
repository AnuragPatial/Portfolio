import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  server: { port: 3000, host: "0.0.0.0", allowedHosts: ["terminal.local"] },
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(__dirname, ".") } },
  build: {
    rollupOptions: {
      output: {
        onlyExplicitManualChunks: true,
        manualChunks(id) {
          if (/node_modules\/(react|react-dom|scheduler)\//.test(id))
            return "react-vendor";
          if (id.includes("/node_modules/three/")) return "three-core";
          if (/node_modules\/@react-three\/(fiber|drei)\//.test(id))
            return "three-react";
        },
      },
    },
  },
});
