import { resolve } from 'path'


module.exports = {
  define: { 'process.env': {} },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
    alias: {
      '@': resolve('src/renderer/src'),
      '@renderer': resolve('src/renderer/src')
    }
  }
}
