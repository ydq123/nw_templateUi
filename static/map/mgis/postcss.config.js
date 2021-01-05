module.exports = {
  plugins: {
    // 'autoprefixer': {},
    'postcss-px-to-viewport': {
      viewportWidth: 375,
      unitPrecision: 3, // 允许转换后保留的小数位数
      viewportUnit: 'vw',
      selectorBlackList: [], // 要保留px单位的选择器列表
      minPixelValue: 2, // 设置会被转换的最小值
      mediaQuery: false // 媒体查询中的是否会被转换
    }
  }
}
