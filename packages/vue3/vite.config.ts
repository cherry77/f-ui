import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import dts from 'vite-plugin-dts'

const entry = './../ui/index.ts'
export default defineConfig({
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
      external: ['vue', 'vue-demi'],
      input: [entry],
      output: [
        // esm
        {
          format: 'es',
          // dir: './../ui/f-ui/vue3/es',
          entryFileNames: '[name].mjs'
        },
        // cjs
        {
          format: 'cjs',
          // dir: './../ui/f-ui/vue3/lib',
          entryFileNames: '[name].js'
        },
      ],
    },
    // 这一块是不会被使用的，想用的是rollup打包，知道是打一个lib包就好
    lib: {
      entry,
      formats: ['es', 'cjs'],
    },
  },
})
