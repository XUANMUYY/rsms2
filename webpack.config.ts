import { resolve } from 'path'


module.exports = {
  module: {
    rules: [
      {
        test: /\.sql$/,
        use: 'raw-loader'
      }
    ]
  },
  define: { 'process.env': {} },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
    alias: {
      '@': resolve('src/renderer/src'),
      '@renderer': resolve('src/renderer/src')
    }
  }
}
