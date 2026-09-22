export default {
  typescript: true,
  jsxRuntime: 'automatic',
  replaceAttrValues: {
    '#000': 'currentColor',
    '#000000': 'currentColor',
    'black': 'currentColor',
    '#E74C3C': 'currentColor',
    '#e74c3c': 'currentColor',
    '#2F53FF': 'currentColor'
  },
  svgoConfig: {
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            removeViewBox: false,
            cleanupIds: false,
            removeUselessStrokeAndFill: false,
            removeUnknownsAndDefaults: false
          }
        }
      }
    ]
  },
  dimensions: false, // width, height 속성을 제거
};
