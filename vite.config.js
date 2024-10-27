import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { VitePWA } from "vite-plugin-pwa";

const manifestForPlugin = {
  registerType: "prompt",
  includeAssets: ['favicon.ico', "apple-touc-icon.png", "masked-icon.png" ],
  manifest: {
    name: "Job Portal",
    short_name: "Job Portal",
    description: "An app that can show the latest job vacancies",
    icons: [   
      {
        src: '/apple-touch-icon.png',
        sizes:'180x180',
        type:'image/png',
        purpose:'apple touch icozn',
      },
      {
        src: "./icon-32x32.png",
        sizes: "32x22",
        type: "image/png",
        purpose:'favicon'
      },   
      {
        src: "./icon-16x16.png",
        sizes: "16x16",
        type: "image/png",
        purpose:'favicon'
      },
      {
        src: "./icon-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "./icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose:'favicon'
      },
    ],
    theme_color: "#181818",
    background_color: "#e8eac2",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  },
};
export default defineConfig({
  plugins: [react(),VitePWA(manifestForPlugin)],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
