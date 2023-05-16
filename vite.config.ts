import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path'; // path 需安装的 @types/node
// 按需引入插件 unplugin-vue-components unplugin-auto-import -D (按需引入时element-plus不需要在main.ts中引入，插件会自动挂载处理，可以在全局直接使用)
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
// 生成 .gz 文件
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default ({ mode }) => {
  console.log('mode', loadEnv(mode, process.cwd()).VITE_BASE_URL); //127.0.0.1:9000/api
  return defineConfig({
    plugins: [
      vue(),
      // 支持 import.meta.env.VITE_XXX
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      // 自动引入组件
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      // 生成 .gz 文件
      {
        ...viteCompression(),
        apply: 'build', // 默认情况下插件在开发 (serve) 和生产 (build) 模式中都会调用，使用 apply 属性指明它们仅在 'build' 或 'serve' 模式时调用
      },
    ],
    // 配置别名
    resolve: {
      alias: {
        '@': path.resolve('./src'), // @ 代替 src
        '#': path.resolve('./types'), // # 代替 types
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          // 配置全局 scss 样式文件
          additionalData: '@import "@/assets/styles/index.scss";',
        },
      },
    },
    // 配置端口与代理
    server: {
      host: '0.0.0.0',
      port: 8080,
      open: true,
      https: false,
      proxy: {
        '/api': {
          target: '要代理的地址',
          changeOrigin: true,
          ws: true,
          rewrite: (path: string) => path.replace(/^\/api/, ''),
        },
      },
    },
    //分包：通过() => import()形式加载的组件会自动分包，第三方插件需手动分包
    build: {
      rollupOptions: {
        output: {
          // js和css文件夹分离
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          // 分包
          manualChunks: {
            // vue: ['vue', 'pinia', 'vue-router'],
            vue: ['vue'],
            elementIcons: ['@element-plus/icons-vue'],
          },
        },
      },
    },
  });
};
