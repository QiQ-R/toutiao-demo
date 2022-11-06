module.exports = {
  plugins: {

    'postcss-pxtorem': {
      rootValue({ file }) { // 解构了obj.file
        return file.includes('vant')  ? 37.5 : 75
      },
      propList: ['*']
    }
  }
}
