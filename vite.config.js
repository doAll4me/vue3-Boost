import vue from "@vitejs/plugin-vue";
import path from "node:path";
import { join } from "path";
import { defineConfig } from "vite";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      // 指定symbolID格式
      symbolId: "icon-[name]",
    }),
  ],

  // 软链接
  resolve: {
    alias: {
      "@": join(__dirname, "/src"),
    },
  },

  // 开发代理（解决跨域
  server: {
    proxy: {
      "/api": {
        target: "https://api.imooc-front.lgdsunday.club",
        changeOrigin: true,
        secure: false, // 开发时建议先 false，避免 https 证书问题
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    },
  },
});
