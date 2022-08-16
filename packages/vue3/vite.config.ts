import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import dts from 'vite-plugin-dts'
export default defineConfig({
  optimizeDeps: {
    exclude: ['vue-demi'],
  },
  plugins: [
    vue(),
    // dts({
    //   insertTypesEntry: true,
    //   copyDtsFiles: false,
    // }),
  ],
  build: {
    target: 'modules',
    minify: false,
    rollupOptions: {
      external: ['vue'],
      input: ['./../ui/src/index.ts'],
      output: [
        // esm
        {
          format: 'es',
          dir: './../ui/dist/vue3/es',
          entryFileNames: '[name].js'
        },
        // cjs
        {
          format: 'cjs',
          dir: './../ui/dist/vue3/lib',
          entryFileNames: '[name].js'
        },
      ],
    },
    // 这一块是不会被使用的，想用的是rollup打包，知道是打一个lib包就好
    lib: {
      entry: './../ui/src/index.ts',
      formats: ['es', 'cjs'],
    },
  },
})
