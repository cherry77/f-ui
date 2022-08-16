import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
// import dts from 'vite-plugin-dts'
export default defineConfig({
  optimizeDeps: {
    exclude: ['vue-demi'],
  },
  plugins: [
    createVuePlugin(),
    // dts({
    //   insertTypesEntry: true,
    //   copyDtsFiles: false,
    // }),
  ],
  build: {
    target: 'modules',
    minify: false,
    rollupOptions: {
      external: ['vue', 'vue-demi'],
      input: ['./../ui/src/index.ts'],
      output: [
        // esm
        {
          format: 'es',
          dir: './../ui/dist/vue2/es',
          entryFileNames: '[name].js'
        },
        // cjs
        {
          format: 'cjs',
          dir: './../ui/dist/vue2/lib',
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
