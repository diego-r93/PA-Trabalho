const path = require('path')

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: path.resolve(__dirname, '../backend/data'),
  filenameHashing: false,
  // devServer: {
  //   port: 3000
  // }
})